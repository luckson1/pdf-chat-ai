
import S3 from "aws-sdk/clients/s3";
import { NextResponse , NextRequest} from "next/server";
import { env } from "@/lib/env.mjs";
import { nanoid } from "nanoid";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import { getUserServer } from "@/lib/authSession";
const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});


export  async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const name = searchParams.get('name')


  try {
  

const {usersId}= await getUserServer()
    if (!usersId) {
      return NextResponse.json("Un authenticated", {
        status: 401,
      });
    }

    if (!name) {
      return NextResponse.json("Server Error", {
        status: 500,
      });
    }
    const redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    })
    // Create a new ratelimiter, that allows 5 requests per 5 seconds
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
    });
    const { success } = await ratelimit.limit(usersId)

    if (!success) {
      return new NextResponse("Too many requests", {
        status: 429,
      })
    }
  
    const Key=nanoid()+name

      const s3Params = {
        Bucket: env.BUCKET_NAME,
        Key,
        Expires: 60,
        ContentType: type
      };

      const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    return NextResponse.json({
        uploadUrl,
        key: Key,
      });
    

  } catch (error) {
    console.log(error);
  }
}


