
// export const runtime = 'edge';
import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { createAudioEmbeddings, createS3Embeddings, createTxtAws, createWebEmbeddings } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve(inngest, [createS3Embeddings,  createWebEmbeddings, createAudioEmbeddings, createTxtAws],
//      {
//     streaming: "allow",
//   }
  
  );
