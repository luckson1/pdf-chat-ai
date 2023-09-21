
'use client'
import React, { FC, memo, useContext, useEffect } from "react";
import { Document } from "react-pdf";
import { PDFContext } from "../../state";
import { setNumPages } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";

const Pages: FC<{}> = () => {
  const {
    state: { mainState, paginated },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
  }, []);

  if (!currentDocument || currentDocument.fileData === undefined) return null;
  console.log(currentDocument.uri)

  return (
    <Document 
    
      file={currentDocument.uri}
      onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
      loading={<span>Loading...</span>}
    >
      {paginated ? <PDFSinglePage /> : <PDFAllPages />}
    </Document>
  );
};

const PDFPages=memo(Pages)

export default PDFPages;
