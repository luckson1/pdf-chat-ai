import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as AWS from "aws-sdk";
import { env } from "@/lib/env.mjs";
import { inngest } from "@/inngest/client";
import { nanoid } from 'nanoid'
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { name } from "inngest/next";
import { spawn } from 'child_process';
import { Readable } from 'stream';
import  { Buffer } from 'buffer';

  // Setting AWS config
  AWS.config.update({
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region: env.REGION,
  });

  const s3 = new AWS.S3(); 
    // Setting AWS config
    AWS.config.update({
      accessKeyId: env.ACCESS_KEY,
      secretAccessKey: env.SECRET_KEY,
      region: env.REGION,
    });

  
export const documentRouter = createTRPCRouter({
  addDoc: protectedProcedure
    .input(z.object({ key: z.string(), name: z.string(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
try {
  const userId = ctx.session.user.id;

  const document = await ctx.prisma.document.create({
    data: {
      key: input.key,
      name: input.name,
      userId,
      type: input.type,
    },
  });
  inngest.send({
    name: "docs/s3.create",
    data: { key: input.key, userId: document.userId, id: document.id },
  });

  return document;
} catch (error) {
  console.log(error)
}
    }),
    addAudioDoc: protectedProcedure
    .input(z.object({ key: z.string(), name: z.string(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // const document = await ctx.prisma.document.create({
      //   data: {
      //     key: input.key,
      //     name: input.name,
      //     userId,
      //     type: input.type,
      //   },
      // });
      // inngest.send({
      //   name: "docs/s3.create",
      //   data: { key: input.key, userId: document.userId, id: document.id },
      // });

      try {
        console.log('here')
      function generateSignedUrl() {
        const params = {
          Bucket: env.BUCKET_NAME,
          Key: input.key,
        };

        return s3.getSignedUrl("getObject", params);
      }
    
      const signedUrl = generateSignedUrl();
    
    
      const response = await fetch(signedUrl);
   
      const arrayBuffer = await response.arrayBuffer();
    

      
      
      async function pipecopy(inputBuffer: ArrayBuffer) {
        const ffmpeg = spawn('ffmpeg', [
          '-hide_banner',
          '-i', 'pipe:0',
          '-codec', 'copy',
          '-movflags', 'empty_moov',
          '-f', 'ipod', 
          'pipe:1'
        ]);
      
        const stream = new Readable();
        stream._read = () => {};
      
        ffmpeg.stdout.on('data', (data) => {
          stream.push(data);
        });
      
        ffmpeg.on('exit', (code, signal) => {
          console.log(`ffmpeg process exited with code ${code} and signal ${signal}`);
          stream.push(null)
        });
      
        ffmpeg.stdin.write(inputBuffer);
        ffmpeg.stdin.end();
      
        const buffer = await new Promise((resolve, reject) => {
          //@ts-ignore
          let chunks = [];
          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          stream.on('end', () => {
            //@ts-expect-error
            resolve(ArrayBuffer.concat(chunks));
          });
          stream.on('error', (err) => {
            reject(err);
          });
        });
      
        return buffer as ArrayBuffer;
      }
      const newBuffer= await pipecopy(arrayBuffer)
      const blob=new Blob([newBuffer])
      const path="https://storage.googleapis.com/aai-docs-samples/espn.m4a"
      const loader = new OpenAIWhisperAudio(path);
   

      const docs = await loader.load();
      
      console.log(docs[0]?.pageContent);
      return docs
      } catch (error) {
        console.log(error)
      }
    
    }),
    addWebDoc: protectedProcedure
    .input(z.object({  url: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
const key= nanoid()
      const document = await ctx.prisma.document.create({
        data: {
          key,
          name: input.url,
          userId,
          type: 'html',
        },
      });
      inngest.send({
        name: 'docs/web.create',
        data: { url: input.url, userId: document.userId, id: document.id },
      });

      return document;
    }),
    
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const docs = await ctx.prisma.document.findMany({
      where: {
        userId,
      },
    });
    return docs;
  }),
  getOne: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      const docs = await ctx.prisma.document.findUniqueOrThrow({
        where: {
          key: input.key,
        },
      });
      return docs;
    }),
  getUrlInfo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        select: {
          key: true,
          name: true,
          type: true

        },
      });
      let signedUrl=''
      const type = getFileExtension(document.name);
    if (document.type==='html') {
      signedUrl = document.name
      return  { signedUrl, type}
     

    }

      function generateSignedUrl() {
        const params = {
          Bucket: env.BUCKET_NAME,
          Key: document.key,
        };

        return s3.getSignedUrl("getObject", params);
      }
      function getFileExtension(filename: string) {
        return filename.split(".").pop();
      }
    
      signedUrl = generateSignedUrl();
      return { signedUrl, type };
    }),
});
