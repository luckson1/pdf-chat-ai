import { PineconeClient } from "@pinecone-database/pinecone";
import { env } from "./env.mjs";
import { delay } from "./utils";
import * as dotenv from "dotenv";

dotenv.config();

let pineconeClientInstance: PineconeClient | null = null;

async function createIndex(client: PineconeClient, indexName: string) {
  try {
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: 	1536,
        metric: "cosine",
      },
    });
    console.log(
      `Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(env.INDEX_INIT_TIMEOUT);
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

async function initPineconeClient() {
  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      apiKey: env.PINECONE_API_KEY,
      environment: env.PINECONE_ENVIRONMENT,
    });
    const indexName = env.PINECONE_INDEX_NAME;

    const existingIndexes = await pineconeClient.listIndexes();

    if (!existingIndexes.includes(indexName)) {
      createIndex(pineconeClient, indexName);
    } else {
      console.log("Your index already exists. nice !!");
    }

    return pineconeClient;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}

const createPineConeInstance = async () => {
  const API_KEY = env.PINECONE_API_KEY
  const ENDPOINT_URL = `https://controller.${env.PINECONE_ENVIRONMENT}.pinecone.io/databases`;

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Api-Key': API_KEY,
  });

  const requestBody = {
    name: 'auth-guide',
    dimension: 8,
    metric: 'euclidean',
  };

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const responseBody = await response.json();
      throw new Error(`Request failed with status: ${response.status}, ${JSON.stringify(responseBody)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


export async function getHttpPineconeClient() {
  pineconeClientInstance = await createPineConeInstance()
  if (!pineconeClientInstance) {
throw new Error('No Vector Database Found')
  }


  return pineconeClientInstance;
}