
import S3 from "aws-sdk/clients/s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { NextResponse , NextRequest} from "next/server";
import { env } from "@/lib/env.mjs";
import { nanoid } from "nanoid";


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
   
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json("Un authenticated", {
        status: 401,
      });
    }

    if (!name) {
      return NextResponse.json("Server Error", {
        status: 500,
      });
    }

    const Key=name

      const s3Params = {
        Bucket: env.BUCKET_NAME,
        Key,
        Expires: 60,
        ContentType: type
      };

      const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);
console.log(Key, uploadUrl)
    return NextResponse.json({
        uploadUrl,
        key: Key,
      });
    

  } catch (error) {
    console.log(error);
  }
}


// import { nanoid } from "nanoid";
// import { env } from "@/lib/env";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/server/auth";
// import { NextResponse, NextRequest } from "next/server";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3 = new S3Client({
//   region: env.REGION,
//   credentials: {
//     accessKeyId: env.ACCESS_KEY,
//     secretAccessKey: env.SECRET_KEY,
//   },
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get("type") ;
//   try {
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id;

//     // make entries to image table for the product images

//     if (!userId) {
//       return NextResponse.json("Un authenticated", {
//         status: 401,
//       });
//     }
//     const Key = nanoid();
// console.log(1, Key)
//     const command = new GetObjectCommand({
//       Bucket: env.BUCKET_NAME,
  
//       Key,
//       // ResponseContentType: type ?? undefined
//     });
//     console.log(2, Key)
//     // Create a request from the command

//     // Get the signed URL
//     const uploadUrl = await getSignedUrl(s3, command, {
//       expiresIn: 15 * 60 ,
//       signingRegion: env.REGION,
//     });
// console.log(3,
//   Key)
//     return NextResponse.json({
//       uploadUrl,
//       key: Key,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
