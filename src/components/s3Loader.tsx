'use client'
import { memo, useEffect, useState } from "react";
// import DocViewer, { DocViewerRenderers } from "./docviewer";
//  function Viewer({signedUrl, type }: { signedUrl: string, type:string }) {
//   const docs = [
//     { uri: signedUrl, fileType:type }, 


//   ];

//   return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className=" h-[85vh] w-full rounded-lg"/>;
  
// }
const Viewer=({  signedUrl, type}: {  signedUrl:string, type:string} ) => {
  const [encodedUrl, setEncodedUrl]=useState<string>()
const url=signedUrl
useEffect(()=> {
if(url) {
  setEncodedUrl(encodeURIComponent(url))
}
}, [url])
  const iFrameUrl = 'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true';
  return (
    <div className="w-full h-full " id="msdoc-renderer">
      <iframe
      className="w-full h-[70vh]"
        id="msdoc-iframe"
        title="msdoc-iframe"
        src={ iFrameUrl }
      />
    </div>
  );
};

export const  DocumentViewer = memo(Viewer)
