'use client'
import { memo } from "react";
import DocViewer, { DocViewerRenderers } from "./docviewer";
 function Viewer({signedUrl, type }: { signedUrl: string, type:string }) {
  const docs = [
    { uri: signedUrl, fileType:type }, 


  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className="h-auto min-h-[85vh] w-full rounded-lg"/>;
  
}

export const  DocumentViewer = memo(Viewer)
