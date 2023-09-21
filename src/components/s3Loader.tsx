'use client'
import {   useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/app/api/_trpc/client";
import { Button } from "./ui/button";
import { IconRefresh } from "./ui/icons";

export const DocumentViewer=({  signedUrl, docName}: {  signedUrl?:string, docName?:string} ) => {
  const [iFrameUrl , setIFrameUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  
  useEffect(()=> {
  if(signedUrl) {
    setIFrameUrl('https://docs.google.com/viewer?url=' + encodeURIComponent(signedUrl) + '&embedded=true')
  }
  }, [signedUrl])
  useEffect(()=> {
    if(docName) {
      setName(docName)
    }
    }, [docName])

  if (!iFrameUrl) return null
  if (!name) return null
  const ctx=api.useContext()
  return (
    <Card className="w-full h-[85vh] " id="msdoc-renderer">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-hidden flex flex-row justify-between">
          {name}
          <Button size={'sm'} variant={'outline'} onClick={()=>ctx.documents.getUrlInfo.invalidate()}>
            
            <IconRefresh className="w-8 h-6" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%]">
      <iframe
      className="w-full h-full rounded-lg"
        src={ iFrameUrl }
    
      />
      </CardContent>
      
    </Card>
  );
};

