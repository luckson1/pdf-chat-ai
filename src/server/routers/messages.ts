import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Input } from "postcss";

export const messageRouter = createTRPCRouter({

    create: protectedProcedure.input(z.object({role:z.enum(["user" , "assistant",  "system" , "function"]), content: z.string(), documentId: z.string(), sources: z.array(z.string()).optional()})).mutation(async({ctx, input})=> {
        const userId= ctx.session.user.id
        const {role,content, documentId }=input
        const sources=input.sources ?? []
        const message= await ctx.prisma.message.create ({
            data: {
                userId,
              role,
              content,
              documentId,
              sources
            }
        })
        return message
    }),
    getDocumentMessages: protectedProcedure.input(z.object({id:z.string()})).query(async({ctx, input})=> {
         const messages= await ctx.prisma.message.findMany({
            where: {
                documentId: input.id
            },
            orderBy: {
               createdAt: 'desc' 
            }
        })
     return messages
    })
    
})