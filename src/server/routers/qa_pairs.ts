import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "../db";

export const QAPairsRouter = createTRPCRouter({

    create: protectedProcedure.input(z.object({question: z.string(), answer: z.string(), documentId: z.string()})).mutation(async({ctx, input})=> {
        const usersId = ctx.user.id;
        const {question, answer, documentId}=input
        const QAPair= await ctx.prisma.qAPairs.create({
            data: {
                usersId,
                question, 
                answer,
                documentId
            }
        })
        return QAPair
    }),
    getDocChatHistory: protectedProcedure.input(z.object({id:z.string()})).query(async ({ ctx , input}) => {
        const chatHistory=await prisma.qAPairs.findMany({
            where: {
documentId: input.id
            },
            select: {
                question: true,
                answer: true
            }
        })
        return chatHistory
        
      }),
})