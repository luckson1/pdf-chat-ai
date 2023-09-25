'use client'
// @ts-ignore
import React from "react";
import { pdfjs } from "react-pdf";
import { DocRenderer } from "../../types";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const PDFRenderer: DocRenderer = ({ mainState }) => {
  return (
    <PDFProvider mainState={mainState}>
      <div className="flex flex-col  flex-1 overflow-y-hidden text-white scrollbar-track-primary, scrollbar-thumb-primary bg-slate-100">
        <PDFControls />
        <PDFPages />
      </div>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
