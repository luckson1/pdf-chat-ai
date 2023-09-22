'use client'
// @ts-ignore
import React from "react";
import { pdfjs } from "react-pdf";
import { DocRenderer } from "../../types";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFRenderer: DocRenderer = ({ mainState }) => {
  return (
    <PDFProvider mainState={mainState}>
      <div className="flex flex-col h-full w-full">
        <PDFControls />
        <PDFPages />
      </div>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
