import crypto from "crypto";
import getRawBody from "raw-body";
import { Readable } from "stream";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env.mjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
type SubscriptionResponse = {
    data: {
      id: string;
      type: string;
      links: {
        self: string;
      };
      attributes: {
        urls: {
          customer_portal: string;
          update_payment_method: string;
        };
        pause: string | null;
        status: string;
        ends_at: string | null;
        order_id: number;
        store_id: number;
        cancelled: boolean;
        renews_at: string;
        test_mode: boolean;
        user_name: string;
        card_brand: string;
        created_at: string;
        product_id: number;
        updated_at: string;
        user_email: string;
        variant_id: number;
        customer_id: number;
        product_name: string;
        variant_name: string;
        order_item_id: number;
        trial_ends_at: string | null;
        billing_anchor: number;
        card_last_four: string;
        status_formatted: string;
        first_subscription_item: {
          id: number;
          price_id: number;
          quantity: number;
          created_at: string;
          updated_at: string;
          is_usage_based: boolean;
          subscription_id: number;
        };
        // ... add more attributes here as needed
      };
      relationships: {
        order: {
          links: {
            self: string;
            related: string;
          };
        };
        store: {
          links: {
            self: string;
            related: string;
          };
        };
        product: {
          links: {
            self: string;
            related: string;
          };
        };
        variant: {
          links: {
            self: string;
            related: string;
          };
        };
        customer: {
          links: {
            self: string;
            related: string;
          };
        };
        order_item: {
          links: {
            self: string;
            related: string;
          };
        };
        subscription_items: {
          links: {
            self: string;
            related: string;
          };
        };
        subscription_invoices: {
          links: {
            self: string;
            related: string;
          };
        };
        // ... add more relationships here as needed
      };
    };
    meta: {
      test_mode: boolean;
      event_name: string;
      // ... add more meta properties here as needed
    };
  };
  
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
      const response: SubscriptionResponse = JSON.parse(rawBody.toString());

      const { id, attributes } = response.data;
      const {
        product_id,
        product_name,
        variant_id,
        variant_name,
        renews_at,
        status,
        user_email,
        first_subscription_item
        
      } = attributes;

      await prisma.subscription.create({
        data: {
          id,
          product_id: product_id, 
          product_name: product_name,
          variant_id: variant_id ,
          variant_name: variant_name,

          status,
          user_email,
        },
      });

      if (status === "active") {
        await prisma.profile.update({
          where: {
            email: user_email,
          },
          data: {
            isPro: true,
          },
        });

      
      } 
 
    return NextResponse.json({ success: true },{status: 200} );
    } catch (error) {
      console.log(error);
    }
  };
