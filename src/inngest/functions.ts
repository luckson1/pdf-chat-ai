import { getPineconeClient } from "@/lib/pinecone-client";
import { inngest } from "./client";
import { getChunkedDocsFromS3Files } from "@/lib/loaders";
import { pineconeEmbedAndStore } from "@/lib/vector-store";

type s3Prams = {
  data: {
    key: string;
    userId: string;
    id:string
  };
};
export type Events = {
  "docs/s3.create" :  s3Prams;

};
export const creates3Embeddings = inngest.createFunction(
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