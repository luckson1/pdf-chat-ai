import { appRouter } from "@/server/root";
import { createTRPCContext } from "@/server/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest, NextResponse } from "next/server";


const handler = (req: NextRequest, res: NextResponse) =>

  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async ()=> await createTRPCContext(req, res, )
  });

export { handler as GET, handler as POST };