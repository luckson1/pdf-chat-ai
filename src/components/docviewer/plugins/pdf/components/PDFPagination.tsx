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
    } else if (newPage<0) {
      dispatch(setCurrentPage(currentPage))
    } else{
      dispatch(setCurrentPage( newPage))
    }
   
  }, 600);
  
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
       <ChevronLeft className="w-6 h-6"/>
      </Button>

      <div  className='flex flex-row space-x-1 justify-center items-center' id="pdf-pagination-info">
        Page <Input className="w-12" value={currentPage} onChange={handleChange}/>  /{numPages}
      </div>

      <Button size={'icon'}
       variant={'outline'}
        id="pdf-pagination-next"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <ChevronRight className="w-6 h-6"/>
      </Button>
    </div>
  );
};

export default PDFPagination;


