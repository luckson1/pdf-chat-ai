import { env } from "@/lib/env.mjs";
import fs from "fs";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
    const formData = await req.formData();
   console.log(formData)
    // const formDataEntryValues = Array.from(formData.values());
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
            },
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log(data)
    // for (const formDataEntryValue of formDataEntryValues) {
    //     formDataEntryValue
    //   if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        
    //     const file = formDataEntryValue as unknown as Blob;
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //     fs.writeFileSync(`/tmp/${file.name}`, buffer);
 
    //   const loader = new OpenAIWhisperAudio(`/tmp/${file.name}`);
  
    //   const docs = await loader.load();
      
    //   console.log(docs);
    //   return docs
    //   }
    // }
    return NextResponse.json({ success: true });
} catch (error) {
   console.log(error) 
}
}