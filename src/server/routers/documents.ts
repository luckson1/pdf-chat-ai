import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getPineconeClient } from "@/lib/pinecone-client";
import { getChunkedDocsFromS3Files, } from "@/lib/loaders";
import { pineconeEmbedAndStore } from "@/lib/vector-store";

export const documentRouter = createTRPCRouter({
    addDoc: protectedProcedure.input(z.object({key: z.string(), name: z.string(), type:z.string()})).mutation(async({ctx, input})=> {
      console.log('got the message')
        const userId=ctx.session.user.id
      const  namespace = input.key;
      const pineconeClient = await getPineconeClient();
      console.log("Preparing chunks from unstructured docs file");
      const docs = await getChunkedDocsFromS3Files(input.key);
      console.log(`Loading ${docs.length} chunks into pinecone...`);
      await pineconeEmbedAndStore(pineconeClient, docs, namespace);
      console.log("Data embedded and stored in pine-cone index");
     
      const document=ctx.prisma.document.create({
        data: {
          key:input.key,
          name:input.name,
          userId,
          type:input.type

        }
      })
return document

    }),
    getAll: protectedProcedure.query(async({ctx})=> {
      const userId=ctx.session.user.id
      const docs= await ctx.prisma.document.findMany({
        where: {
          userId
        }
      })
      return  docs
    }),
    getOne: protectedProcedure.input(z.object({key: z.string()})).query(async({ctx, input})=> {
      
      const docs= await ctx.prisma.document.findUniqueOrThrow({
        where: {
          key: input.key
        }
      })
      return docs
    })
})