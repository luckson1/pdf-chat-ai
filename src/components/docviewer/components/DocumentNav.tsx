'use client'
import React, { FC, useContext } from "react";
import { DocViewerContext } from "../state";
import { nextDocument, previousDocument } from "../state/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DocumentNav: FC<{}> = () => {
  const {
    state: { currentDocument, currentFileNo, documents },
    dispatch,
  } = useContext(DocViewerContext);

  if (documents.length <= 1 || !currentDocument) return null;

  let fileName = currentDocument.uri;

  const splitURL = fileName.split("/");
  if (splitURL.length) {
    //@ts-ignore
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <div className="min-w-[150px] flex flex-row items-center justify-end py-3 ">
    
      <p >
        Doc {currentFileNo + 1} of {documents.length}
      </p>

      <Button
          size={'sm'}
          variant={'outline'}
 
    
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        <ChevronLeft  size="60%" />
      </Button>

      <Button
          size={'sm'}
          variant={'outline'}
     
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        <ChevronRight  size="60%" />
      </Button>
    </div>
  );
};


