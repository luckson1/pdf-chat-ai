'use client'
import React, { FC, useContext } from "react";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { initialPDFState } from "../state/reducer";
import {
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";
import { Button } from "@/components/ui/button";

const PDFControls: FC<{}> = () => {
  const {
    state: { mainState, paginated, zoomLevel, numPages },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;

  return (
    <div  className="flex sticky top-0 left-0 z-[1] justify-end p-2 shadow">
      {paginated && numPages > 1 && <PDFPagination />}


      <Button size={'sm'}
        id="pdf-zoom-out"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel - 0.1))}
      >
        <ZoomOutPDFIcon color="#000" size="80%" />
      </Button>

      <Button size={'sm'}
        id="pdf-zoom-in"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel + 0.1))}
      >
        <ZoomInPDFIcon color="#000" size="80%" />
      </Button>

      <Button size={'sm'}
        id="pdf-zoom-reset"
        onMouseDown={() => dispatch(setZoomLevel(initialPDFState.zoomLevel))}
        disabled={zoomLevel === initialPDFState.zoomLevel}
      >
        <ResetZoomPDFIcon color="#000" size="70%" />
      </Button>

      {numPages > 1 && (
        <Button size={'sm'}
          id="pdf-toggle-pagination"
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="70%"
            reverse={paginated}
          />
        </Button>
      )}
    </div>
  );
};

export default PDFControls;




