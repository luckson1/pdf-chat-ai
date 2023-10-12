import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { env } from "./env.mjs";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";


const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2000,
  chunkOverlap: 100,
});


export async function getChunkedDocsFromPDF(blob: Blob, usersId:string, id:string, name:string) {
  try {
    "got the message"
    const loader = new WebPDFLoader(blob);
    const chunkedDocs = await loader.loadAndSplit();
    for (const doc of chunkedDocs) {
      doc.metadata={...doc.metadata, usersId, id, name}
    }
    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}
export async function getChunkedDocsFromUnstrucuted(path: string, usersId:string, id:string, name:string) {
  try {
  
    const options = {
      apiKey: "N6ruejXdrsa815iTzQ3rsJCly9p6D0"
  
    };
    
    const loader = new UnstructuredLoader(
    path,
      options
    );
    const docs = await loader.load();
  
   

    const chunkedDocs = await textSplitter.splitDocuments(docs);
for (const doc of chunkedDocs) {
  doc.metadata={...doc.metadata, usersId, id, name}
}
    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export async function getChunkedDocsFromS3Files(key: string, usersId:string, id:string, name:string) {

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

  
    const docs = await loader.loadAndSplit(textSplitter)

    for (const doc of docs) {
      doc.metadata={...doc.metadata, usersId, id, name}
    }
   return docs
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export async function getChunkedDocsFromWeb(path: string, usersId:string, id:string, name:string) {
  try {
    const loader = new PuppeteerWebBaseLoader(path);

    const docs = await loader.load();

  

    const chunkedDocs = await textSplitter.splitDocuments(docs);
    for (const doc of chunkedDocs) {
      doc.metadata={...doc.metadata, usersId, id, name}
    }
    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export async function getChunkedDocsFromYT(path: string, usersId:string, id:string, name:string) {
  try {
    const loader = YoutubeLoader.createFromUrl(path, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();

  

    const chunkedDocs = await textSplitter.splitDocuments(docs);
    for (const doc of chunkedDocs) {
      doc.metadata={...doc.metadata, usersId, id, name}
    }
    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}
