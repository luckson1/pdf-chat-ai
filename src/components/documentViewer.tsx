"use client";


import { useSearchParams } from "next/navigation";
// import { ReactNode } from "react";
// import { DocumentViewer } from "./s3Loader";
import { api } from "@/app/api/_trpc/client";
import { DocumentViewer } from "./s3Loader";
import { useEffect, useState } from "react";

export function ViewLoader({ id }: { id:  string}) {
  const {data}=api.documents.getUrlInfo.useQuery({id})
const signedUrl=data?.signedUrl
const docName=data?.name
const [encodedUrl, setEncodedUrl]=useState<string>('')
const [name, setName]=useState<string>('')

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
  return (<div className="w-full h-auto">
  <DocumentViewer encodedUrl={encodedUrl}  name={name}/>
  </div>)
}

export default function MainDocumentViewer() {
  const params = useSearchParams();
  const id = params?.get("id");
 

  if (!id) {
    return null;
  }
  return (
    <div className="w-full h-auto">
      <ViewLoader id={id}/>
     
    </div>
  );
}
