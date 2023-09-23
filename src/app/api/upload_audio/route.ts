import { env } from "@/lib/env.mjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
    const formData = await req.formData();
        formData.append("model", "whisper-1");
   console.log(formData)
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            },
            method: "POST",
            body: formData,
          });
          const data = await res.json();
   
    return NextResponse.json({ success: true });
} catch (error) {
   console.log(error) 
}
}