


import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    OPENAI_API_KEY: z.string().trim().min(1),
    PINECONE_API_KEY: z.string().trim().min(1),
    PINECONE_ENVIRONMENT: z.string().trim().min(1),
    PINECONE_INDEX_NAME: z.string().trim().min(1),
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
  ACCESS_KEY: z.string(), 
  SECRET_KEY: z.string(),
  BUCKET_NAME: z.string(), 
  REGION: z.string(), 
  secret_key: z.string(),
  // API_KEY: z.string(),
  RESEND_API_KEY:z.string(),
  UNSD_KEY:z.string(),
  ASSEMBLYAI_API_KEY: z.string(),
  UPSTASH_REDIS_REST_URL:  z.string(),
UPSTASH_REDIS_REST_TOKEN:  z.string(),
POSTGRES_PRISMA_URL:  z.string().url(),
POSTGRES_URL_NON_POOLING:  z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */


  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_ENVIRONMENT: process.env. PINECONE_ENVIRONMENT, 
    PINECONE_INDEX_NAME: process.env. PINECONE_INDEX_NAME,
    POSTGRES_URL: process.env. POSTGRES_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.  CLIENT_SECRET,
    ACCESS_KEY: process.env.   ACCESS_KEY,
  SECRET_KEY: process.env. SECRET_KEY,
  BUCKET_NAME: process.env .  BUCKET_NAME,
  REGION: process.env.  REGION, 
  secret_key: process.env.   secret_key,
  // API_KEY: process.env
  RESEND_API_KEY:process.env.  RESEND_API_KEY,
  UNSD_KEY:process.env. UNSD_KEY,
  ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  UPSTASH_REDIS_REST_URL:  process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN:  process.env.UPSTASH_REDIS_REST_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_PRISMA_URL:  process.env.POSTGRES_PRISMA_URL,
  POSTGRES_URL_NON_POOLING:  process.env.POSTGRES_URL_NON_POOLING,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
