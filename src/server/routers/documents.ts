import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as AWS from "aws-sdk";
import { env } from "@/lib/env.mjs";
import { inngest } from "@/inngest/client";
import { nanoid } from "nanoid";
import axios, { AxiosResponse } from "axios";
import path from "path";

type TranscriptionData = {
  id: string;
  language_model: string;
  acoustic_model: string;
  language_code: string;
  status: string;
  audio_url: string;
  text: string;
  words: Array<string>;
  utterances: Array<string>;
  confidence: number;
  audio_duration: number;
  punctuate: boolean;
};
AWS.config.update({
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
});

const s3 = new AWS.S3();

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
        const extention=path.extname(input.name).slice(1)
        const isPdf=extention==='pdf'
        if (isPdf) {
          console.log('this is a pdf')
          inngest.send({
            name: 'docs/pdf.create',
            data: { Key: input.key, userId: document.userId, id: document.id },
          });
        } else {
          inngest.send({
            name: "docs/s3.create",
            data: { key: input.key, userId: document.userId, id: document.id },
          });
        }
        

        return document;
      } catch (error) {
        console.log(error);
      }
    }),
  transcribe: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        function generateSignedUrl() {
          const params = {
            Bucket: env.BUCKET_NAME,
            Key: input.key,
          };

          return s3.getSignedUrl("getObject", params);
        }

        const signedUrl = generateSignedUrl();
        const assembly = axios.create({
          baseURL: "https://api.assemblyai.com/v2",
          headers: {
            authorization: env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
          },
        });

        const response: AxiosResponse<TranscriptionData> = await assembly.post(
          "/transcript",
          {
            audio_url: signedUrl,
            dual_channel: true,
          }
        );
        const id = response.data.id;

        return id;
      } catch (error) {
        console.log(error);
      }
    }),
  getTranscription: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const assembly = axios.create({
          baseURL: "https://api.assemblyai.com/v2",
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
          },
        });

        const response: AxiosResponse<TranscriptionData> = await assembly.get(
          `/transcript/${input.id}`
        );
        const data = response.data;
        const status = response.data.status;
        const text = response.data.text;
        const userId = ctx.session.user.id;
        if (status === "completed") {
          const Key = nanoid();

          const document = await ctx.prisma.document.create({
            data: {
              key: Key,
              name: `${input.name}.pdf`,
              userId,
              type: "text/plain",
            },
          });

          inngest.send({
            name: "docs/audio.create",
            data: {
              text,
              userId,
              id: document.id,
            },
          });

          inngest.send({
            name: "aws/txt.create",
            data: {
              text,
              Key,
            },
          });
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    }),
  addWebDoc: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const key = nanoid();
      const document = await ctx.prisma.document.create({
        data: {
          key,
          name: input.url,
          userId,
          type: "html",
        },
      });
      inngest.send({
        name: "docs/web.create",
        data: { url: input.url, userId: document.userId, id: document.id },
      });

      return document;
    }),

  getAll: protectedProcedure.input(z.object({
    skip: z.number(),
    take: z.number(),
  }),).query(async ({ ctx , input}) => {
    const userId = ctx.session.user.id;
    const {skip, take}=input
    const docs = await ctx.prisma.document.findMany({
      where: {
        userId,
      },
      skip,
      take
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
          type: true,
        },
      });
      let signedUrl = "";
      const type = getFileExtension(document.name);
      if (document.type === "html") {
        signedUrl = document.name;
        return { signedUrl, type };
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
