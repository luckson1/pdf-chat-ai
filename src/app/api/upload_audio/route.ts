import fs from "fs";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    for (const formDataEntryValue of formDataEntryValues) {
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const file = formDataEntryValue as unknown as Blob;
      //   const buffer = Buffer.from(await file.arrayBuffer());
      //   fs.writeFileSync(`public/${file.name}`, buffer);
  console.log(file)
      const loader = new OpenAIWhisperAudio(file);
  
      const docs = await loader.load();
      
      console.log(docs);
      return docs
      }
    }
    return NextResponse.json({ success: true });
} catch (error) {
   console.log(error) 
}
}