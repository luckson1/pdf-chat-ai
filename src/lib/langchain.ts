import { ConversationalRetrievalQAChain } from "langchain/chains";

import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PromptTemplate } from "langchain/prompts";

export const streamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  streaming: true,
  temperature: 0,
});

export const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});
type callChainArgs = {
  question: string;
  chatHistory: string;
 vectorStore: PineconeStore
};
 
// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = `You are a professor, who is knowledgeable in a wide range of fields and disciplines.  Take a deep breath. Use the following pieces of context to answer the question at the end. If the user mentions words like: document, pdf, source, material or source material, they are referring to the pieces of context. 
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;

export async function callChain({ question, chatHistory, vectorStore }: callChainArgs) {
  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");


    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      
      {
        qaChainOptions:{
          prompt: PromptTemplate.fromTemplate(QA_TEMPLATE),
          
        },
        returnSourceDocuments: true, //default 4
       
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
          template: STANDALONE_QUESTION_TEMPLATE
        },
     
      }
    );

    // Question using chat-history
    // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
    chain
      .call(
        {
          
          question: sanitizedQuestion,
          chat_history: chatHistory,
        },
        [handlers]
      )
      .then(async (res) => {
       
        const sourceDocuments = res?.sourceDocuments;
        const pageContents =  sourceDocuments.map(
          ({ pageContent }: { pageContent: string }) => pageContent
        );
        const metadata =  sourceDocuments.map(
          ({  metadata }: {  metadata: {chunck: number} }) => metadata
        );
        console.log("already appended ", data);
        data.append({
          sources: pageContents,
          metadata
        });
        data.close();
      });

    // Return the readable stream
    return new StreamingTextResponse(stream, {}, data);

  } catch (e) {
    console.error(e);
    throw new Error("Call chain method failed to execute successfully!!");
  }
}
