import { getPineconeClient } from "@/lib/pinecone-client";
import { inngest } from "./client";
import { getChunkedDocsFromS3Files, getChunkedDocsFromWeb } from "@/lib/loaders";
import { pineconeEmbedAndStore } from "@/lib/vector-store";

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
export type Events = {
  "docs/s3.create" :  s3Prams;
  "docs/web.create" :  webPrams;

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