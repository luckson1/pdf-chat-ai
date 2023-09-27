'use client'
// @ts-ignore
import React from "react";
import { pdfjs } from "react-pdf";
import { DocRenderer } from "../../types";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const PDFRenderer: DocRenderer = ({ mainState }) => {
  return (
    <PDFProvider mainState={mainState}>
      <ScrollArea className="flex flex-col  flex-1  text-transparent py-5 px-5"  >
        <PDFControls />
        <PDFPages />
        <ScrollBar />
      </ScrollArea>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
