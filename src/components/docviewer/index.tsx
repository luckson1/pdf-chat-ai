"use client";
import React, { CSSProperties, FC, ReactNode } from "react";

import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";

import MSDocRenderer from "./plugins/msdoc";
import PDFRenderer from "./plugins/pdf";
import TXTRenderer from "./plugins/txt";
import { DocRenderer, IConfig, IDocument, ITheme } from "./types";
import { AppProvider } from "./state";
import { Card, CardContent } from "../ui/card";
export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  children?: ReactNode;
}

const DocViewer: FC<DocViewerProps> = (props) => {
  const { documents } = props;

  if (!documents || documents === undefined) {
    throw new Error(
      "Please provide an array of documents to DocViewer.\ne.g. <DocViewer documents={[ { uri: 'https://mypdf.pdf' } ]} />"
    );
  }

  return (
    
    
        <Card className="w-full h-[85vh] py-10">
     
          <CardContent className="w-full h-full overflow-hidden">
          <AppProvider {...props}>
          <div
        className="flex flex-col overflow-hidden bg-[#eee] mx-auto"
        {...props}
      >
          <HeaderBar />
            <ProxyRenderer />
            </div>
            </AppProvider>
          </CardContent>
        </Card>
   

  );
};

export default DocViewer;

export { DocViewerRenderers } from "./plugins";
export * from "./types";
export * from "./utils/fileLoaders";
export { MSDocRenderer, PDFRenderer, TXTRenderer };
