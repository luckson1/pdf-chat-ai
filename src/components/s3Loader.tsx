'use client'
import { api } from "@/app/api/_trpc/client";
import { PDFViewer } from "./viewers";
import { memo, useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
 function Viewer({signedUrl, type }: { signedUrl: string, type:string }) {
  const docs = [
    { uri: signedUrl, fileType:type }, 


  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className="h-auto min-h-[60vh] w-full"/>;
  
//   switch (data.type) {
//     // case 'pdf':
//         return <PDFViewer data={data} />;
//     case "docx":
//       return <DocxViewer signedUrl={data.fileUrl} />;
//     case "csv":
//       return <CSVViewer signedUrl={data.fileUrl} />;
//     case "ppt":
//       return (
//         <div>
//           PowerPoint presentations are not supported for direct viewing. Please
//           download to view.
//         </div>
//       );
//     default:
//       return <div>Unsupported format.</div>;
//   }

// const [fileData, setFileData] = useState<Uint8Array | null>(null);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//     async function fetchUint8ArrayFromS3(url: string) {
//         try {
//           setLoading(true)
//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch file. Status: ${response.status}`);
//             }

//             const blob = await response.blob();
//             const arrayBuffer = await blob.arrayBuffer();
//             setFileData(new Uint8Array(arrayBuffer));
//         } catch (err) {
//           //@ts-ignore
//             setError(err.message);
//             console.log("here", err)
//         } finally {
//             setLoading(false);
//         }
//     }

//     fetchUint8ArrayFromS3(signedUrl);
// }, [signedUrl]);

// if (loading) {
//     return <div>Loading...</div>;
// }

// if (error) {
//     return <div>Error: {error}</div>;
// }
// if (!fileData) return null
// return <PDFViewer data={fileData} />;
}

export const  DocumentViewer = memo(Viewer)
