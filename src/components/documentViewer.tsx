"use client";


import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { DocumentViewer } from "./s3Loader";
import { api } from "@/app/api/_trpc/client";

export function ViewLoader({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default function MainDocumentViewer() {
  const params = useSearchParams();
  const id = params?.get("id");
  const {data: doc}= api.documents.getOne.useQuery({key:id ?? ""})
function getFileExtension(filename?: string) {
    if (!filename) return undefined
    return filename.split('.').pop();
  }
const type=getFileExtension(doc?.name)
  if (!id) {
    return null;
  }
  return (
    <div className="w-full">
      <ViewLoader>
        <DocumentViewer key={id} type={type}/>
      </ViewLoader>
    </div>
  );
}
