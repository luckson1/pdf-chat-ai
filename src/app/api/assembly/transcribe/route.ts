import { env } from "@/lib/env.mjs";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import * as AWS from "aws-sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
  // Setting AWS config
  AWS.config.update({
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region: env.REGION,
  });

  const s3 = new AWS.S3(); 
    // Setting AWS config
    AWS.config.update({
      accessKeyId: env.ACCESS_KEY,
      secretAccessKey: env.SECRET_KEY,
      region: env.REGION,
    });

export async function POST(req: Request) {
  try {
    const keySchema = z.string()
    const { key } = await req.json();
    console.log(key)
    const isValidKey = keySchema.safeParse(key);
    if (!isValidKey.success) {
      throw new TRPCError({
        code: 'PARSE_ERROR',
        message: "Invalid key provided",
      });
    }
    const validKey = keySchema.parse(key);
    function generateSignedUrl() {
        const params = {
          Bucket: env.BUCKET_NAME,
          Key: validKey,
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
  

    const response = await assembly.post("/transcript", {
      audio_url: signedUrl,
    });
console.log(response)
    return response
  } catch (error) {
    console.log(error);
  }
}
