import React, { FC, ReactNode, useContext } from "react";
import { Page } from "react-pdf";
import { PDFContext } from "../../state";


interface Props {
  pageNum?: number;
}
interface PageWrapperProps {
  last?: boolean;
  children: ReactNode
}

const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum } = props;

  const {
    state: { mainState,  zoomLevel, currentPage,  numPages },
  } = useContext(PDFContext);

  const rendererRect = mainState?.rendererRect || null;

  const _pageNum = pageNum || currentPage;


  return (
<div className="overflow-x-auto overflow-y-hidden text-[1px] h-10">
      <Page
      
        pageNumber={_pageNum}
        scale={zoomLevel}
        height={(rendererRect?.height || 100) - 100}
        width={(rendererRect?.width || 100) - 100}
      />
      
      </div>
  );
};

export default PDFSinglePage;


