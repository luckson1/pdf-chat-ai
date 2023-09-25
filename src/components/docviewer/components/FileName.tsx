'use client'
import React, { FC, useContext } from "react";
import { DocViewerContext } from "../state";

export const FileName: FC<{}> = () => {
  const {
    state: { config, currentDocument },
  } = useContext(DocViewerContext);

  if (!currentDocument || config?.header?.disableFileName) return null;

  let fileName = currentDocument.uri || "";
  fileName = decodeURI(fileName);

  if (!config?.header?.retainURLParams) {
    fileName = fileName.split("?")[0] ?? "";
  }

  const splitURL = fileName.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1] ?? "";
  }

  return (
    <div className="flex-1, text-left font-semibold my-2 overflow-hidden text-foreground">
      {fileName}
    </div>
  );
};

