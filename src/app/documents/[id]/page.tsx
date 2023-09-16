
import { Chat } from "@/components/chat";
import MainDocumentViewer from "@/components/documentViewer";

export default function Home() {
  return (
  
        <main className="w-full flex flex-col-reverse md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="w-full max-w-3xl h-auto">
<MainDocumentViewer />
          </div>
          <div className="w-full max-w-2xl">
<Chat />
          </div>
       
        </main>
  
  );
}
