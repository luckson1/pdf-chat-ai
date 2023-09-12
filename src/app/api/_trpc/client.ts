import { AppRouter } from "@/server/root";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>({});