'use client'
import React, { FC, useContext } from "react";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash"
const PDFPagination: FC<{}> = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);
  const debouncedSearch = debounce( (e:string) => {
    const newPage= Number(e)
    if (newPage>numPages)  {
      dispatch(setCurrentPage(currentPage))
    } else {
      dispatch(setCurrentPage( newPage))
    }
   
  }, 300);
  
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  return (
    <div className='flex items-center space-x-3' id="pdf-pagination">
      <Button size={'icon'}
      variant={'outline'}
        id="pdf-pagination-prev"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
       <ChevronRight className="w-6 h-6"/>
      </Button>

      <div  className='text-left' id="pdf-pagination-info">
        Page <Input className="w-8" value={currentPage} onChange={handleChange}/>  /{numPages}
      </div>

      <Button size={'icon'}
       variant={'outline'}
        id="pdf-pagination-next"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <ChevronLeft className="w-6 h-6"/>
      </Button>
    </div>
  );
};

export default PDFPagination;


