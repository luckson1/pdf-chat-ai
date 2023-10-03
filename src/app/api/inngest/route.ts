import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  ChatPaperUserCreated,
  createAudioEmbeddings,
  createPdfDocs,
  createS3Embeddings,
  createTxtAws,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve(
  inngest,
  [createS3Embeddings, createAudioEmbeddings, createTxtAws, createPdfDocs, ChatPaperUserCreated],
);
