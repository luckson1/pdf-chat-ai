
import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";
import { Redis } from "@upstash/redis/nodejs";
import { env } from "@/lib/env.mjs";
import { Ratelimit } from "@upstash/ratelimit";
import { getPineconeClient } from "@/lib/pinecone-client";
import { getSingleDocVectorStore } from "@/lib/vector-store";
import { z } from "zod";
import { getUserServer } from "@/lib/authSession";
const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];

  const id= body.id;
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1]?.content;

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }
  
  const {usersId, isPro}= await getUserServer()
  if (! usersId) {
    return NextResponse.json("Un authenticated", {
      status: 401,
    });
  }
  
   
    // make entries to image table for the product images

 const idSchema=z.string()
 const isIdString=idSchema.safeParse(id).success
    if (!isIdString) {
      return NextResponse.json("Forbidden", {
        status: 403,
      });
    }
   const docId= idSchema.parse(id)
    const allowedDailyMessages=isPro? 500 : 50
    const redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    })
  
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(allowedDailyMessages, "1 d"),
    });
    const { success } = await ratelimit.limit(usersId)

    if (!success) {
      return new NextResponse("Exceeded allowed daily requests. Please upgrade", {
        status: 429,
      })
    }
    const pineconeClient = await getPineconeClient();
    const vectorStore = await getSingleDocVectorStore(pineconeClient, usersId, docId);
  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    vectorStore
    });

    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
