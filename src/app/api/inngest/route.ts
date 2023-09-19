import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  createAudioEmbeddings,
  createS3Embeddings,
  createTxtAws,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve(
  inngest,
  [createS3Embeddings, createAudioEmbeddings, createTxtAws],
  {
    streaming: "force",
  }
);
