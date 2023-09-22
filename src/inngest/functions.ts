import { getPineconeClient } from "@/lib/pinecone-client";
import { inngest } from "./client";
import {
  getChunkedDocsFromPDF,
  getChunkedDocsFromS3Files,
  getChunkedDocsFromWeb,
} from "@/lib/loaders";
import { pineconeEmbedAndStore } from "@/lib/vector-store";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "@/lib/env.mjs";
import * as AWS from "aws-sdk";
import axios, { AxiosResponse } from "axios";
import { TranscriptionData } from "@/server/routers/documents";
import { prisma } from "@/server/db";
import { nanoid } from "nanoid";
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
    id: string;
  };
};
type webPrams = {
  data: {
    url: string;
    userId: string;
    id: string;
  };
};
type AudioPrams = {
  data: {
    userId: string;
    id: string;
    name: string;
    Key: string
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
    id: string;
    Key: string;
  };
};
export type Events = {
  "docs/s3.create": s3Prams;
  "docs/web.create": webPrams;
  "docs/audio.create": AudioPrams;
  "aws/txt.create": TextPrams;
  "docs/pdf.create": PDFPrams;
};
export const createS3Embeddings = inngest.createFunction(
  { name: "s3 Docs embeddings Created" },
  { event: "docs/s3.create" },
  async ({ event, step }) => {
    const embeddings = await step.run("create embeddings from s3", async () => {
      const pineconeClient = await getPineconeClient();

      const docs = await getChunkedDocsFromS3Files(
        event.data.key,
        event.data.userId,
        event.data.id
      );

      await pineconeEmbedAndStore(pineconeClient, docs);
    });

    return embeddings;
  }
);

export const createWebEmbeddings = inngest.createFunction(
  { name: "WebDocs embeddings Created" },
  { event: "docs/web.create" },
  async ({ event, step }) => {
    const embeddings = await step.run("create embeddings from s3", async () => {
      const pineconeClient = await getPineconeClient();

      const docs = await getChunkedDocsFromWeb(
        event.data.url,
        event.data.userId,
        event.data.userId
      );

      await pineconeEmbedAndStore(pineconeClient, docs);
    });

    return embeddings;
  }
);

export const createAudioEmbeddings = inngest.createFunction(
  { name: "Audio Docs embeddings Created" },
  { event: "docs/audio.create" },
  async ({ event, step }) => {
    const embeddings = await step.run(
      "create embeddings from audio",
      async () => {
        const { userId, id, name, Key } = event.data;

        const assembly = axios.create({
          baseURL: "https://api.assemblyai.com/v2",
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
          },
        });

     let transcriptionData: TranscriptionData | undefined;
        while (true) {
        
          const pollingResponse : AxiosResponse<TranscriptionData> = await assembly.get(
            `/transcript/${id}`
          );
          const transcriptionResult = pollingResponse.data
        
          if (transcriptionResult.status === 'completed') {
        
            transcriptionData=transcriptionResult
          
            break
          } else if (transcriptionResult.status === 'error') {
            throw new Error(`Transcription failed`)
          } else {
            await new Promise((resolve) => setTimeout(resolve, 3000))
          }
        }
  
        const text = transcriptionData.text;
        const utterances=transcriptionData.utterances
        const textSaved=utterances.map(utterance=> `${utterance.speaker}: ${utterance.text}`).join('\n\n')
    

       let document
       const existingDocument= await prisma.document.findUnique({
        where: {
          key: Key
        }
       })
       if (existingDocument) {
        document=existingDocument
        
       } else {
        document = await prisma.document.create({
          data: {
            key: Key,
            name: name,
            userId,
            type: "text/plain",
          },
        });
       }

        const doc = new Document({
          pageContent: text,
        });
        const docs = [doc];
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 1000,
          chunkOverlap: 200,
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);
        for (const doc of chunkedDocs) {
          doc.metadata = { ...doc.metadata, userId, id:document.id };
        }
        const pineconeClient = await getPineconeClient();
        await pineconeEmbedAndStore(pineconeClient, chunkedDocs);
        // const blob = new Blob([textSaved], { type: 'text/plain' });
        // const body = blob.stream();
        const params = {
          Bucket: env.BUCKET_NAME,
          Key,
          Body: textSaved,
          ContentType: 'text/plain'
        };
    
        await s3.upload(params).promise();

     
        
        
      }
    );

    return embeddings;
  }
);

export const createTxtAws = inngest.createFunction(
  { name: "text file uploaded on AWS" },
  { event: "aws/txt.create" },
  async ({ event, step }) => {
    const upload = await step.run(
      "create and upload txt file to AWS",
      async () => {
        const { text, Key } = event.data;

        const blob = new Blob([text], { type: "text/plain" });
        const params = {
          Bucket: env.BUCKET_NAME,
          Key,
          Body: blob,
          ContentType: "text/plain",
        };

        await s3.upload(params).promise();
      }
    );
    return upload;
  }
);

export const createPdfDocs = inngest.createFunction(
  { name: "pdf file docs created" },
  { event: "docs/pdf.create" },
  async ({ event, step }) => {
    const pdfDocs = await step.run("create pdf docs from s3 url", async () => {
      const { userId, id, Key } = event.data;
      function generateSignedUrl() {
        const params = {
          Bucket: env.BUCKET_NAME,
          Key,
        };

        return s3.getSignedUrl("getObject", params);
      }
      const signedUrl = generateSignedUrl();
      console.log("url", signedUrl);
      async function fetchBlobFromSignedUrl(signedUrl: string) {
        try {
          const response = await fetch(signedUrl);
          if (!response.ok) {
            throw new Error("An error occured");
          }
          const blob = await response.blob();

          return blob;
        } catch (err) {
          throw new Error(`Failed to fetch Blob: ${err}`);
        }
      }
      const blob = await fetchBlobFromSignedUrl(signedUrl);

      const docs = await getChunkedDocsFromPDF(blob, userId, id);
      const pineconeClient = await getPineconeClient();

      await pineconeEmbedAndStore(pineconeClient, docs);
    });
    return pdfDocs;
  }
);
