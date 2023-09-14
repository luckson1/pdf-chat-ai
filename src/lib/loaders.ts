import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { env } from "./env";

export async function getChunkedDocsFromPDF(path: string) {
  try {
    console.log("hi");
    const loader = new PDFLoader(path);
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
  console.log(key)
  try {
    const loader = new S3Loader({
      bucket: env.BUCKET_NAME,
      key,
      s3Config: {
        region: env.REGION,
        credentials: {
          accessKeyId: env.ACCESS_KEY,
          secretAccessKey: env.secret_key,
        
        },
      },
      unstructuredAPIURL: "https://unstructured.io/general/v0/general",
      unstructuredAPIKey: env.UNSD_KEY,
    });

    const docs = await loader.load();
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
