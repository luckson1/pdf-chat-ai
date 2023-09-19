import { getPineconeClient } from "@/lib/pinecone-client";
import { inngest } from "./client";
import { getChunkedDocsFromPDF, getChunkedDocsFromS3Files, getChunkedDocsFromWeb } from "@/lib/loaders";
import { pineconeEmbedAndStore } from "@/lib/vector-store";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "@/lib/env.mjs";
import * as AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
});

const s3 = new AWS.S3();

type s3Prams = {
  data: {
    key: string;
    userId: string;
    id:string
  };
};
type webPrams = {
  data: {
    url: string;
    userId: string;
    id:string
  };
};
type AudioPrams = {
  data: {
  text: string;
    userId: string;
    id:string
  };
};
type TextPrams = {
  data: {
  text: string;
   Key: string;
  };
};
type PDFPrams = {
  data: {
    userId: string;
  id:string
   Key: string;
  };
};
export type Events = {
  "docs/s3.create" :  s3Prams;
  "docs/web.create" :  webPrams;
  "docs/audio.create" :  AudioPrams;
  "aws/txt.create" : TextPrams
  "docs/pdf.create" : PDFPrams

};
export const createS3Embeddings = inngest.createFunction(
  { name: "s3 Docs embeddings Created" },
  { event: "docs/s3.create" },
  async ({ event, step }) => {
    const embeddings = await step.run("create embeddings from s3", async () => {
      const pineconeClient = await getPineconeClient();

      const docs = await getChunkedDocsFromS3Files(event.data.key, event.data.userId, event.data.id);
 
      await pineconeEmbedAndStore(pineconeClient, docs);
    
    });

    return embeddings;
  }
);

export const createWebEmbeddings = inngest.createFunction(
  { name: "WebDocs embeddings Created" },
  { event: 'docs/web.create'},
  async ({ event, step }) => {
    const embeddings = await step.run("create embeddings from s3", async () => {
      const pineconeClient = await getPineconeClient();

      const docs = await getChunkedDocsFromWeb(event.data.url, event.data.userId, event.data.userId);
 
      await pineconeEmbedAndStore(pineconeClient, docs);
    
    });

    return embeddings;
  }
);

export const createAudioEmbeddings=inngest.createFunction(
  { name: "Audio Docs embeddings Created" },
  { event: 'docs/audio.create'},
  async ({event, step})=> {
    const embeddings = await step.run("create embeddings from audio", async () => {
    const {text, userId, id}=event.data
    const doc= new Document({
      pageContent: text,
     
    })
    const docs=[doc]
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    const chunkedDocs = await textSplitter.splitDocuments(docs);
    for (const doc of chunkedDocs) {
      doc.metadata={...doc.metadata, userId, id}
    }
    const pineconeClient = await getPineconeClient();
    
    await pineconeEmbedAndStore(pineconeClient, chunkedDocs)})
    return embeddings
  }
)

export const createTxtAws=inngest.createFunction(
  { name: "text file uploaded on AWS" },
  { event: 'aws/txt.create'},
  async ({event, step})=> {
    const upload= await step.run("create and upload txt file to AWS", async () => {
    const {text, Key}=event.data
   

    const body = Buffer.from(text, 'utf-8')
    const params = {
      Bucket: env.BUCKET_NAME,
      Key,
      Body: body,
      ContentType: "text/plain",
    };

    await s3.upload(params).promise();
  })}
)

export const createPdfDocs=inngest.createFunction(
  { name: "pdf file docs created" },
  { event: 'docs/pdf.create'},
  async ({event, step})=> {
    const pdfDocs= await step.run("create pdf docs from s3 url", async () => {
    const {userId, id, Key}=event.data
    function generateSignedUrl() {
      const params = {
        Bucket: env.BUCKET_NAME,
        Key,
      };

      return s3.getSignedUrl("getObject", params);
    }
    const signedUrl = generateSignedUrl();
console.log('url', signedUrl)
    async function fetchBlobFromSignedUrl(signedUrl: string) {
      try {
        const response = await fetch(signedUrl);
        if (!response.ok) {
          throw new Error('An error occured');
        }
        const blob = await response.blob();
        
return blob
      } catch (err) {
          throw new Error(`Failed to fetch Blob: ${err}`);
      }
  }
  const blob = await fetchBlobFromSignedUrl(signedUrl);
  


  const docs = await getChunkedDocsFromPDF(blob, userId, id);
  const pineconeClient = await getPineconeClient();

  await pineconeEmbedAndStore(pineconeClient, docs);

  })
return pdfDocs
}
)