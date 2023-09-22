'use client'
import React, { FC, useContext } from "react";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";
import { Button } from "@/components/ui/button";

const PDFPagination: FC<{}> = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);

  return (
    <div className='flex items-center space-x-3' id="pdf-pagination">
      <Button size={'icon'}
      variant={'outline'}
        id="pdf-pagination-prev"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <PrevPDFNavIcon color="#000" size="50%" />
      </Button>

      <div  className='text-left' id="pdf-pagination-info">
        Page {currentPage}/{numPages}
      </div>

      <Button size={'icon'}
       variant={'outline'}
        id="pdf-pagination-next"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <NextPDFNavIcon color="#000" size="50%" />
      </Button>
    </div>
  );
};

export default PDFPagination;


