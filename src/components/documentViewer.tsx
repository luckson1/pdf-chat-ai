"use client";


import { useSearchParams } from "next/navigation";
// import { ReactNode } from "react";
// import { DocumentViewer } from "./s3Loader";
import { api } from "@/app/api/_trpc/client";
import { DocumentViewer } from "./s3Loader";

export function ViewLoader({ id }: { id:  string}) {
  const {data}=api.documents.getUrlInfo.useQuery({id})
const signedUrl=data?.signedUrl
console.log(signedUrl)
const type=data?.type
if(!signedUrl) return null
if(!type) return null
  return (<div className="w-full h-auto">
  <DocumentViewer signedUrl={signedUrl}  type={type}/>
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
