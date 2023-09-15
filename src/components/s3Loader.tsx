import { api } from "@/app/api/_trpc/client";
import { PDFViewer } from "./viewers";

export async function DocumentViewer({id }: { id: string }) {
  const {
    data
  } = api.documents.getAWSData.useQuery({id });

  if (!data?.fileUrl) return null;
  if (!data.type) return null;
  
//   switch (data.type) {
//     // case 'pdf':
//         return <PDFViewer data={data} />;
//     case "docx":
//       return <DocxViewer signedUrl={data.fileUrl} />;
//     case "csv":
//       return <CSVViewer signedUrl={data.fileUrl} />;
//     case "ppt":
//       return (
//         <div>
//           PowerPoint presentations are not supported for direct viewing. Please
//           download to view.
//         </div>
//       );
//     default:
//       return <div>Unsupported format.</div>;
//   }
return <PDFViewer url={data.fileUrl} />;
}
