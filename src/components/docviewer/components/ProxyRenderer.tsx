import React, { FC } from "react";
import { useDocumentLoader } from "../utils/useDocumentLoader";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

export const ProxyRenderer: FC<{}> = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documents, documentLoading, currentDocument } = state;





  const Contents = () => {
    if (!documents.length) {
      return <div id="no-documents">{/* No Documents */}</div>;
    } else if (documentLoading) {
      return (
        <div
          className="flex
        flex-1
    h-auto
        items-center
        justify-center"
        >
            <Icons.spinner className=" h-4 w-4 animate-spin" />
        </div>
      );
    } else {
      if (CurrentRenderer) {
        return <CurrentRenderer mainState={state} />;
      } else if (CurrentRenderer === undefined) {
        return null;
      } else {
        return (
          <div id="no-renderer" data-testid="no-renderer">
            No Renderer for file type {currentDocument?.fileType}
            <Button
              id="no-renderer-download"
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
    <div className="  flex
    flex-1">
      <Contents />
    </div>
  );
};







