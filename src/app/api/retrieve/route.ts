import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";



import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import {
  BytesOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser";

import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { getPineconeClient } from "@/lib/pinecone-client";
import { getVectorStore } from "@/lib/vector-store";
import { ConversationalRetrievalQAChain } from "langchain/chains";



type ConversationalRetrievalQAChainInput = {
  question: string;
  chat_history: VercelChatMessage[];
};

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;
const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE,
);

const ANSWER_TEMPLATE =  `You are an enthusiastic AI professor, who helps students research for their papers. Use the following pieces of context to provide a detailed response the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
Be detailed

{context}

Question: {question}`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

/**
 * This handler initializes and calls a retrieval chain. It composes the chain using
 * LangChain Expression Language. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#conversational-retrieval-chain
 */
export async function POST(req: NextRequest) {
  try {

    const { question, chatHistory, id } = await req.json();
    const session = await getServerSession(authOptions);
      const userId = session?.user?.id;
  
      // make entries to image table for the product images
  
      if (!userId) {
        return NextResponse.json("Un authenticated", {
          status: 401,
        });
      }
  
    if (!question) {
      return NextResponse.json("Error: No question in the request", {
        status: 400,
      });
    }

    const previousMessages = question
    const currentMessageContent =chatHistory

    

    const pineconeClient = await getPineconeClient();
    const vectorStore = await getVectorStore(pineconeClient, userId, id);

    const retriever = vectorStore.asRetriever();

    /**
     * We use LangChain Expression Language to compose two chains.
     * To learn more, see the guide here:
     *
     * https://js.langchain.com/docs/guides/expression_language/cookbook
     */
    const transformStream = new TransformStream();
    const encoder = new TextEncoder();
    const writer = transformStream.writable.getWriter();
    const streamingModel = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        streaming: true,
        temperature: 0,
        verbose: true,
        callbacks: [
            {
              async handleLLMNewToken(token) {
                await writer.ready;
                await writer.write(encoder.encode(`${token}`));
              },
              async handleLLMEnd() {
                console.log("LLM end called");
              },
            },
          ],
      });
      const nonStreamingModel = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        verbose: true,
        temperature: 0,
      });
    const standaloneQuestionChain =  ConversationalRetrievalQAChain.fromLLM(
        streamingModel,
    retriever,
    {
      qaTemplate:  CONDENSE_QUESTION_TEMPLATE,
      questionGeneratorTemplate: CONDENSE_QUESTION_TEMPLATE,
      returnSourceDocuments: true, //default 4
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
      },
    }
    );

    const answerChain = RunnableSequence.from([
      {
        context: retriever.pipe(combineDocumentsFn),
        question: new RunnablePassthrough(),
    
        
      },
      answerPrompt,
       
      streamingModel,
      new BytesOutputParser(),
    ]);

    const conversationalRetrievalQAChain =
      standaloneQuestionChain.pipe(answerChain);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: previousMessages,
    
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}