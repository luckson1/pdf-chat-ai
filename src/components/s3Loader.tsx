'use client'
import { api } from "@/app/api/_trpc/client";
import { PDFViewer } from "./viewers";
import { memo, useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
 function Viewer({signedUrl, type }: { signedUrl: string, type:string }) {
  const docs = [
    { uri: signedUrl, fileType:type }, 


  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className="h-auto min-h-[90vh] w-full"/>;
  
}

export const  DocumentViewer = memo(Viewer)
