'use client'
import {  useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const DocumentViewer=({  signedUrl, docName}: {  signedUrl?:string, docName?:string} ) => {
  const [iFrameUrl , setIFrameUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  
  useEffect(()=> {
  if(signedUrl) {
    // setIFrameUrl('https://docs.google.com/viewer?url=' + encodeURIComponent(signedUrl) + '&embedded=true')
    setIFrameUrl(signedUrl)
  }
  }, [signedUrl])
  useEffect(()=> {
    if(docName) {
      setName(docName)
    }
    }, [docName])

  if (!iFrameUrl) return null
  if (!name) return null
  return (
    <Card className="w-full h-[85vh] " id="msdoc-renderer">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-hidden">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%]">
      <iframe
      nonce=""
      className="w-full h-full rounded-lg"
        src={ iFrameUrl }
    
      />
      </CardContent>
      
    </Card>
  );
};

