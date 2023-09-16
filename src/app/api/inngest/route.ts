import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { createS3Embeddings, createWebEmbeddings } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve(inngest, [createS3Embeddings,  createWebEmbeddings]);
