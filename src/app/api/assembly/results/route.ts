import { env } from "@/lib/env.mjs";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { z } from "zod";

async function handler (req: Request) {
  try {
    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
    });
    const idSchema = z.string().url();
    const { id } = await req.json();
    console.log(id)
    const isValidId = idSchema.safeParse(id);
    if (!isValidId.success) {
        throw new TRPCError({
          code: 'PARSE_ERROR',
          message: "Invalid id provided",
        });
      }
      const validId = idSchema.parse(id);

        const response = await assembly.get(`/transcript/${validId}`);

    

    return response.data
  } catch (error) {
    console.log(error);
  }
}
export { handler as GET, handler as POST };