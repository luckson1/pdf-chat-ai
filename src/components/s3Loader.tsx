'use client'
import { memo, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import DocViewer, { DocViewerRenderers } from "./docviewer";
//  function Viewer({signedUrl, type }: { signedUrl: string, type:string }) {
//   const docs = [
//     { uri: signedUrl, fileType:type }, 


//   ];

//   return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className=" h-[85vh] w-full rounded-lg"/>;
  
// }
const Viewer=({  signedUrl, docName}: {  signedUrl?:string, docName?:string} ) => {
  const [encodedUrl, setEncodedUrl]=useState<string>()
  const [name, setName]=useState<string>()
  
  useEffect(()=> {
  if(signedUrl) {
    setEncodedUrl(encodeURIComponent(signedUrl))
  }
  }, [signedUrl])
  useEffect(()=> {
    if(docName) {
      setName(docName)
    }
    }, [docName])
  const iFrameUrl = 'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true';
  if (!encodedUrl || !name) return null
  return (
    <Card className="w-full h-[85vh] " id="msdoc-renderer">
      <CardHeader>
        <CardTitle className="h-1/12 overflow-hidden">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-11/12">
      <iframe
      className="w-full h-full rounded-lg"
        id="msdoc-iframe"
        title="msdoc-iframe"
        src={ iFrameUrl }
      />
      </CardContent>
      
    </Card>
  );
};

export const  DocumentViewer = memo(Viewer)
