import React, { FC, useContext } from "react";
import { Page } from "react-pdf";
import { PDFContext } from "../../state";

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum } = props;

  const {
    state: { mainState, paginated, zoomLevel, numPages, currentPage },
  } = useContext(PDFContext);

  const rendererRect = mainState?.rendererRect || null;

  const _pageNum = pageNum || currentPage;

  return (

    //@ts-ignore
    <div id="pdf-page-wrapper"  last={_pageNum >= numPages}>
      {!paginated && (
        <div id="pdf-page-info" text-left>
          Page {_pageNum}/{numPages}
        </div>
      )}
      <Page
        pageNumber={_pageNum || currentPage}
        scale={zoomLevel}
        height={(rendererRect?.height || 100) - 100}
        width={(rendererRect?.width || 100) - 100}
      />
    </div>
  );
};

export default PDFSinglePage;




