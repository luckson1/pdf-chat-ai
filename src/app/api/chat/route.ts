import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";

export async function POST(req: NextRequest) {
  const { question, chatHistory, namespace } = await req.json();

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    const transformStream = new TransformStream();
    const readableStrm = callChain({
      question,
      chatHistory,
      transformStream,
      namespace
    });

    return new Response(await readableStrm);
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
