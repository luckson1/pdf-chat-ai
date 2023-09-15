"use client";


import { useSearchParams } from "next/navigation";
// import { ReactNode } from "react";
// import { DocumentViewer } from "./s3Loader";
import { api } from "@/app/api/_trpc/client";
import { DocumentViewer } from "./s3Loader";

export function ViewLoader({ id }: { id:  string}) {
  const {data}=api.documents.getAWSData.useQuery({id})
const signedUrl=data?.signedUrl
if(!signedUrl) return null
  return (<>
  <DocumentViewer signedUrl={signedUrl} />
  </>)
}

export default function MainDocumentViewer() {
  const params = useSearchParams();
  const id = params?.get("id");
 

  if (!id) {
    return null;
  }
  return (
    <div className="w-full">
      <ViewLoader id={id}/>
     
    </div>
  );
}
