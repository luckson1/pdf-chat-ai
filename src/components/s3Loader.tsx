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
const Viewer=({  encodedUrl, name}: {  encodedUrl:string, name:string} ) => {

  const iFrameUrl = 'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true';
  return (
    <Card className="w-full h-[85vh] " id="msdoc-renderer">
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
      <iframe
      className="w-full h-full"
        id="msdoc-iframe"
        title="msdoc-iframe"
        src={ iFrameUrl }
      />
      </CardContent>
      
    </Card>
  );
};

export const  DocumentViewer = memo(Viewer)
