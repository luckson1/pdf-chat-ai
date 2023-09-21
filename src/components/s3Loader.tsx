'use client'
import {   useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "@/app/api/_trpc/client";
import { Button } from "./ui/button";
import { IconRefresh, IconSpinner } from "./ui/icons";

export const DocumentViewer=({  signedUrl, docName, isLoading, type}: {  signedUrl?:string, docName?:string, isLoading: boolean, type?:string} ) => {
  const [msUrl , setMsUrl ]=useState<string>()
  const [gUrl , setGUrl ]=useState<string>()
  const [name, setName]=useState<string>()
  const [isMsDoc, setIsMsDoc]=useState(false)
  const [isPdf, setIsPdf]=useState(false)
  const reloadIFrame = () => {
    const iframeElement = document.querySelector("iframe");
    iframeElement?.contentWindow?.location.reload();
  };
  

  useEffect(()=> {
  if(signedUrl) {
    setGUrl('https://docs.google.com/viewer?url=' + encodeURIComponent(signedUrl) + '&embedded=true')
  setMsUrl(  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    signedUrl
   )}`)
  }
  }, [signedUrl])
  useEffect(()=> {
    const msDocs= [ "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",   "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
    if(docName && type) {
      setName(docName)
      setIsMsDoc(msDocs.includes(type))
     setIsPdf(type===" application/pdf")
    }
    }, [docName, type])
    const ctx=api.useContext()
  if (!msUrl) return null
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
<>
{!isPdf &&
      <Card className="w-full h-[85vh] ">
      <CardHeader>
        <CardTitle className="h-[90%] overflow-hidden flex flex-row justify-between">
          {name}
          <Button size={'sm'} variant={'outline'} >
            
            <IconRefresh className={`w-8 h-6 }`} onClick={reloadIFrame}/>
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[90%]">
      <iframe
      className="w-full h-full rounded-lg"
        src={ isMsDoc? msUrl : gUrl}
  
      />
      </CardContent>
      
    </Card>
}
</>
  );
};

