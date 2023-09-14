import { env } from "./env";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
dotenv.config();
export async function pineconeEmbedAndStore(
  client: PineconeClient,
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[],
  namespace:string
) {
  /*create and store the embeddings in the vectorStore*/
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(env.PINECONE_INDEX_NAME);

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace ,
      textKey: "text",
    });
  } catch (error) {
    console.log("error ", error);
    throw new Error("Failed to load your docs !");
  }
}

export async function getVectorStore(client: PineconeClient, namespace: string) {
  try {
    const embeddings = new OpenAIEmbeddings();
    const index = client.Index(env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
      namespace,
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}
