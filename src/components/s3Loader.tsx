'use client'
import {   useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/app/api/_trpc/client";
import { Button } from "./ui/button";
import { IconRefresh, IconSpinner } from "./ui/icons";

export const DocumentViewer=({  signedUrl, docName, isLoading}: {  signedUrl?:string, docName?:string, isLoading: boolean} ) => {
  const [iFrameUrl , setIFrameUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  const [loading, setLoading]=useState(false)
  
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
    const ctx=api.useContext()
  if (!iFrameUrl) return null
  if (!name) return null
  if(isLoading) {
    return (
      <Card className="w-full h-[85vh] " >
      <CardHeader>
        .
      </CardHeader>
      <CardContent className="w-full h-[90%] flex justify-center items-center">
    <IconSpinner className="w-32 h-32" />
      </CardContent>
      
    </Card>
    )
  }

  return (
    <Card className="w-full h-[85vh] ">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-hidden flex flex-row justify-between">
          {name}
          <Button size={'sm'} variant={'outline'} onClick={()=>{ctx.documents.getUrlInfo.invalidate(); setLoading(true)}}>
            
            <IconRefresh className={`w-8 h-6 ${loading? "animate-spin" : ""}`} />
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

