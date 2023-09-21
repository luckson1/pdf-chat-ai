import React from "react";
import { DocRenderer } from "../../types";
import { textFileLoader } from "../../utils/fileLoaders";

const TXTRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  return <div className="flex flex-col p-7" id="txt-renderer">{currentDocument?.fileData}</div>;
};

export default TXTRenderer;

TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;


