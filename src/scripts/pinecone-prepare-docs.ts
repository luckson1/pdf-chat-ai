// import { getChunkedDocsFromUnstrucuted } from "@/lib/loaders";
// import { pineconeEmbedAndStore } from "@/lib/vector-store";
// import { getPineconeClient } from "@/lib/pinecone-client";
// import { env } from "@/lib/env";

// // This operation might fail because indexes likely need
// // more time to init, so give some 5 mins after index
// // creation and try again.
// (async () => {
//       console.log("here")
//   try {

//     const pineconeClient = await getPineconeClient();
//     console.log("Preparing chunks from PDF file");
//     const docs = await getChunkedDocsFromUnstrucuted(env.PDF_PATH);
//     console.log(`Loading ${docs.length} chunks into pinecone...`);
//     await pineconeEmbedAndStore(pineconeClient, docs, env.PDF_PATH);
//     console.log("Data embedded and stored in pine-cone index");
//   } catch (error) {
//     console.error("Init client script failed ", error);
//   }
// })();
