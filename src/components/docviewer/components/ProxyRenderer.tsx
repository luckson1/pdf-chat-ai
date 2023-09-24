'use client'
import React, { FC } from "react";
import { useDocumentLoader } from "../utils/useDocumentLoader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documents, documentLoading, currentDocument } = state;





  const Contents = () => {
    if (!documents.length) {
      return <div >No Document Found</div>;
    } else if (documentLoading) {
      return (
        <div
          className="flex
        flex-1
    h-full
        items-center
        justify-center"
        >
            <Icons.spinner className=" h-32 w-32 animate-spin" />
        </div>
      );
    } else {
      if (CurrentRenderer) {
        return <CurrentRenderer mainState={state} />;
      } else if (CurrentRenderer === undefined) {
        return null;
      } else {
        return (
          <div>
            No Renderer for file type {currentDocument?.fileType}
            <Button
           
              // download={currentDocument?.uri}
            >
              Download File
            </Button>
          </div>
        );
      }
    }
  };

  return (
    <div className="
    flex-1 overflow-hidden">
      <Contents />
    </div>
  );
};







