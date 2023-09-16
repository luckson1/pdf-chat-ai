import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as AWS from "aws-sdk";
import { env } from "@/lib/env.mjs";
import { inngest } from "@/inngest/client";
import { nanoid } from 'nanoid'
export const documentRouter = createTRPCRouter({
  addDoc: protectedProcedure
    .input(z.object({ key: z.string(), name: z.string(), type: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
          type: 'web',
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
  getAWSData: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const document = await ctx.prisma.document.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        select: {
          key: true,
          name: true,
        },
      });

      // Setting AWS config
      AWS.config.update({
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_KEY,
        region: env.REGION,
      });

      const s3 = new AWS.S3();

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
      const type = getFileExtension(document.name);
      const signedUrl = generateSignedUrl();
      return { signedUrl, type };
    }),
});
