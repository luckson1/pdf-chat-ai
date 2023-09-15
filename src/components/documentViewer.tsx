"use client";


import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { DocumentViewer } from "./s3Loader";

export function ViewLoader({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export default function MainDocumentViewer() {
  const params = useSearchParams();
  const id = params?.get("id");
  if (!id) {
    return null;
  }
  return (
    <div className="w-full">
      <ViewLoader>
        <DocumentViewer key={id} />
      </ViewLoader>
    </div>
  );
}
