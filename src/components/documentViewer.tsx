"use client";


import { useSearchParams } from "next/navigation";
// import { ReactNode } from "react";
// import { DocumentViewer } from "./s3Loader";
import { api } from "@/app/api/_trpc/client";
import { DocumentViewer } from "./s3Loader";

export function ViewLoader({ id }: { id:  string}) {
  const {data, isLoading}=api.documents.getUrlInfo.useQuery({id})
const signedUrl=data?.signedUrl
const docName=data?.name

  return (<div className="w-full h-auto">
  <DocumentViewer signedUrl={signedUrl}  docName={docName} isLoading={isLoading}/>
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
