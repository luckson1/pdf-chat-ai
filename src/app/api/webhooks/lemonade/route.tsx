import crypto from "crypto";
import getRawBody from "raw-body";
import { Readable } from "stream";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env.mjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export interface LemonResponse {
  data: {
    id: string;
    attributes: {
      first_order_item: {
        product_id: number;
        variant_id: number;
        product_name: string;
        variant_name: string;
      };
      product_id: number;
      variant_id: number;
      product_name: string;
      variant_name: string;
      user_name: string;
      user_email: string;
      status: string;
    };
  };
}
export  async function POST(req: Request) {
    const rawBody = await getRawBody(Readable.from(Buffer.from(await req.text())));

    const secret = env.secret_key;
    const hmac = crypto.createHmac("sha256", secret);

    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signedHeaders = req.headers.get("x-signature") 
    if(!signedHeaders) throw new Error("An error occured")

    const signature = Buffer.from(
        Array.isArray( signedHeaders) ?  signedHeaders.join("") :  signedHeaders || "",
        "utf8"
      );

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    try {
      const response: LemonResponse = JSON.parse(rawBody.toString());

      const { id, attributes } = response.data;
      const {
        product_id,
        product_name,
        variant_id,
        variant_name,

        status,
        user_email,
        first_order_item,
      } = attributes;

    //   await prisma.subscription.create({
    //     data: {
    //       id,
    //       product_id: product_id ?? first_order_item.product_id,
    //       product_name: product_name ?? first_order_item.product_name,
    //       variant_id: variant_id ?? first_order_item.variant_id,
    //       variant_name: variant_name ?? first_order_item.variant_name,

    //       status,
    //       user_email,
    //     },
    //   });

    //   if (status === "paid") {
    //     await prisma.user.update({
    //       where: {
    //         email: user_email,
    //       },
    //       data: {
    //         credits: {
    //           increment: 1000,
    //         },
    //       },
    //     });

    //     res.status(200).json({ response });
    //   } else {
    //     res.status(200).json({ response });
    //   }
    console.log(response.data)
    return NextResponse.json({ success: true },{status: 200} );
    } catch (error) {
      console.log(error);
    }
  };
