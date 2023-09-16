import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { creates3Embeddings } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve(inngest, [creates3Embeddings]);
