// import { NextRequest, NextResponse } from "next/server";
// import { callChain } from "@/lib/langchain";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/server/auth";
// import { StreamingTextResponse } from "ai";

// export async function POST(req: NextRequest) {
//   const { question, chatHistory, id } = await req.json();
//   const session = await getServerSession(authOptions);
//     const userId = session?.user?.id;

//     // make entries to image table for the product images

//     if (!userId) {
//       return NextResponse.json("Un authenticated", {
//         status: 401,
//       });
//     }

//   if (!question) {
//     return NextResponse.json("Error: No question in the request", {
//       status: 400,
//     });
//   }

//   try {
//     const transformStream = new TransformStream();
//     const readableStrm = await callChain({
//       question,
//       chatHistory,
//       transformStream,
//      userId,
//      id
//     });

//     return new StreamingTextResponse(readableStrm);
//   } catch (error) {
//     console.error("Internal server error ", error);
//     return NextResponse.json("Error: Something went wrong. Try again!", {
//       status: 500,
//     });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

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

  console.log("Chat history ", formattedPreviousMessages.join("\n"));

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }
  
  const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // make entries to image table for the product images

    if (!userId) {
      return NextResponse.json("Un authenticated", {
        status: 401,
      });
    }
    if (!id) {
      return NextResponse.json("Forbidden", {
        status: 403,
      });
    }
  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
      userId,
      id
    });

    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
