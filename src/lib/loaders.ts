import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { env } from "./env.mjs";
export async function getChunkedDocsFromUnstrucuted(path: string) {
  try {
    console.log("got it");
    const options = {
      apiKey: "N6ruejXdrsa815iTzQ3rsJCly9p6D0"
  
    };
    
    const loader = new UnstructuredLoader(
      "/Users/apple/Desktop/NodeJs/pdf-chat-ai/src/scripts/llms.pdf",
      options
    );
    const docs = await loader.load();
    console.log("docs", docs);
    // From the docs https://www.pinecone.io/learn/chunking-strategies/
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export async function getChunkedDocsFromS3Files(key: string) {

  try {
    const loader = new S3Loader({
      bucket: env.BUCKET_NAME,
      key,
      s3Config: {
        region: env.REGION,
        credentials: {
          accessKeyId: env.ACCESS_KEY,
          secretAccessKey: env.SECRET_KEY,
        
        },
      },
      unstructuredAPIURL: 'https://api.unstructured.io/general/v0/general',
      unstructuredAPIKey: env.UNSD_KEY
    });

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await loader.loadAndSplit(textSplitter)


   return docs
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export async function getChunkedDocsFromWeb(path: string) {
  try {
    const loader = new PuppeteerWebBaseLoader(path);

    const docs = await loader.load();

    console.log("web", docs);
    // From the docs https://www.pinecone.io/learn/chunking-strategies/
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}
