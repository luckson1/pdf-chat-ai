"use client";


import { useSearchParams } from "next/navigation";
import { api } from "@/app/api/_trpc/client";
import { DocumentViewer } from "./s3Loader";
import { Dispatch, SetStateAction } from "react";

export function MainDocumentViewer({ id , numPages, setNumPages}: { id:  string, numPages?: number, setNumPages: Dispatch<SetStateAction<number | undefined>>}) {
  const {data}=api.documents.getUrlInfo.useQuery({id})
const signedUrl=data?.signedUrl
const docName=data?.name
const type=data?.type
  return (<div className="w-full h-auto">
  <DocumentViewer signedUrl={signedUrl}  docName={docName}  type={type} numPages={numPages} setNumPages={setNumPages}/>
  </div>)
}


