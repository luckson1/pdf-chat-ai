import React, { FC, useContext } from "react";
import { Page } from "react-pdf";
import {Page as PageWrap} from "@joshuajaco/react-pdf-renderer-bundled";
import { PDFContext } from "../../state";

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum } = props;

  const {
    state: { mainState,  zoomLevel, currentPage },
  } = useContext(PDFContext);

  const rendererRect = mainState?.rendererRect || null;

  const _pageNum = pageNum || currentPage;

  return (
   <PageWrap wrap>
      <Page
      
        pageNumber={_pageNum || currentPage}
        scale={zoomLevel}
        height={(rendererRect?.height || 100) - 100}
        width={(rendererRect?.width || 100) - 100}
      />
      </PageWrap>
  
  );
};

export default PDFSinglePage;


