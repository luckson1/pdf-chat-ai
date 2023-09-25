// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { type PineconeStore } from "langchain/vectorstores/pinecone";
// import { ConversationalRetrievalQAChain } from "langchain/chains";
// import { getVectorStore } from "./vector-store";
// import * as dotenv from "dotenv";
// import { formatChatHistory } from "./utils";
// import { getPineconeClient } from "./pinecone-client";
// dotenv.config();
// const CONDENSE_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

// Chat History:
// {chat_history}
// Follow Up Input: {question}
// Standalone question:`;

// const QA_TEMPLATE = `You are an enthusiastic AI professor, who helps students research for their papers. Take a deep breath. Use the following pieces of context to provide a well thought out response the question at the end.
// If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
// If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
// The response should be in markdown

// {context}

// Question: {question}`;

// function makeChain(
//   vectorstore: PineconeStore,
//   writer: WritableStreamDefaultWriter
// ) {
//   // Create encoding to convert token (string) to Uint8Array
//   const encoder = new TextEncoder();

//   // Create a TransformStream for writing the response as the tokens as generated
//   // const writer = transformStream.writable.getWriter();

//   const streamingModel = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     streaming: true,
//     temperature: 0,
//     verbose: true,
//     callbacks: [
//       {
//         async handleLLMNewToken(token) {
//           await writer.ready;
//           await writer.write(encoder.encode(`${token}`));
//         },
//         async handleLLMEnd() {
//           console.log("LLM end called");
//         },
//       },
//     ],
//   });
//   const nonStreamingModel = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     verbose: true,
//     temperature: 0,
//   });

//   const chain = ConversationalRetrievalQAChain.fromLLM(
//     streamingModel,
//     vectorstore.asRetriever(),
//     {
//       qaTemplate: QA_TEMPLATE,
//       questionGeneratorTemplate: CONDENSE_TEMPLATE,
//       returnSourceDocuments: true, //default 4
//       questionGeneratorChainOptions: {
//         llm: nonStreamingModel,
//       },
//     }
//   );
//   return chain;
// }

// type callChainArgs = {
//   question: string;
//   chatHistory: [string, string][];
//   transformStream: TransformStream;
//  userId:string,
//  id:string
// };

// export async function callChain({
//   question,
//   chatHistory,
//   transformStream,
//   userId,
//   id
// }: callChainArgs) {
//   try {
//     // Open AI recommendation
//     const sanitizedQuestion = question.trim().replaceAll("\n", " ");
//     const pineconeClient = await getPineconeClient();
//     const vectorStore = await getVectorStore(pineconeClient, userId, id);

//     // Create encoding to convert token (string) to Uint8Array
//     const encoder = new TextEncoder();
//     const writer = transformStream.writable.getWriter();
//     const chain = makeChain(vectorStore, writer);
//     const formattedChatHistory = formatChatHistory(chatHistory);

//     // Question using chat-history
//     // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
//     chain
//       .call({
//         question: sanitizedQuestion,
//         chat_history: formattedChatHistory,
//       })
//       .then(async (res) => {
//         const sourceDocuments = res?.sourceDocuments;
//         const firstTwoDocuments = sourceDocuments.slice(0, 2);
//         const pageContents = firstTwoDocuments.map(
//           ({ pageContent }: { pageContent: string }) => pageContent
//         );
//         const stringifiedPageContents = JSON.stringify(pageContents);
//         await writer.ready;
//         await writer.write(encoder.encode("tokens-ended"));
//         // Sending it in the next event-loop
//         setTimeout(async () => {
//           await writer.ready;
//           await writer.write(encoder.encode(`${stringifiedPageContents}`));
//           await writer.close();
//         }, 100);
//       });
//     // Return the readable stream
//     return transformStream?.readable;
//   } catch (e) {
//     console.error(e);
//     throw new Error("Call chain method failed to execute successfully!!");
//   }
// }

import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vector-store";
import { getPineconeClient } from "./pinecone-client";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";

export const streamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  streaming: true,
  verbose: true,
  temperature: 0,
});

export const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  verbose: true,
  temperature: 0,
});
type callChainArgs = {
  question: string;
  chatHistory: string;
   userId:string,
 id:string
};
 
// Creates a standalone question from the chat-history and the current question
export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

// Actual question you ask the chat and send the response to client
export const QA_TEMPLATE = `You are a professor, who is knowledgeable in a wide range of fields and disciplines.  Take a deep breath. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;
export async function callChain({ question, chatHistory, userId, id }: callChainArgs) {
  try {
    // Open AI recommendation
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pineconeClient = await getPineconeClient();
 const vectorStore = await getVectorStore(pineconeClient, userId, id);
    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    const data = new experimental_StreamData();

    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever(),
      {
        qaTemplate: QA_TEMPLATE,
        questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
        returnSourceDocuments: true, //default 4
        questionGeneratorChainOptions: {
          llm: nonStreamingModel,
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
        console.log("already appended ", data);
        data.append({
          sources: pageContents,
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
