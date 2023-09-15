import { api } from "@/app/api/_trpc/client";
import * as AWS from "aws-sdk";
import { CSVViewer, DocxViewer } from "./viewers";

export async function DocumentViewer({id }: { id: string }) {
  const {
    data
  } = api.documents.getAWSData.useQuery({id });

  if (!data?.file) return null;
  if (!data.type) return null;
  
  switch (data.type) {
    // case 'pdf':
    //     return <PDFViewer data={data} />;
    case "docx":
      return <DocxViewer data={data.file} />;
    case "csv":
      return <CSVViewer data={data.file} />;
    case "ppt":
      return (
        <div>
          PowerPoint presentations are not supported for direct viewing. Please
          download to view.
        </div>
      );
    default:
      return <div>Unsupported format.</div>;
  }
}
