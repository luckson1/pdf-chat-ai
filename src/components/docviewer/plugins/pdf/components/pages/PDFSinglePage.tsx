import React, { FC, ReactNode, useContext } from "react";
import { Page } from "react-pdf";
import { PDFContext } from "../../state";
import { Page as PgWrap} from '@react-pdf/renderer'

interface Props {
  pageNum?: number;
}
interface PageWrapperProps {
  last?: boolean;
  children: ReactNode
}
const PageWrapper = ({last, children}:PageWrapperProps)=> {
  return (<PgWrap wrap>
{children}
  </PgWrap>)
  
}
const PDFSinglePage: FC<Props> = (props) => {
  const { pageNum } = props;

  const {
    state: { mainState,  zoomLevel, currentPage,  numPages },
  } = useContext(PDFContext);

  const rendererRect = mainState?.rendererRect || null;

  const _pageNum = pageNum || currentPage;


  return (
    <PageWrapper last={_pageNum >= numPages}>
      <Page
      
        pageNumber={_pageNum}
        scale={zoomLevel}
        height={(rendererRect?.height || 100) - 100}
        width={(rendererRect?.width || 100) - 100}
      />
      
      </PageWrapper>
  );
};

export default PDFSinglePage;


