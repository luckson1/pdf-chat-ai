
import { Chat } from "@/components/chat";
import MainDocumentViewer from "@/components/documentViewer";

export default function Home() {
  return (
  
        <main className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="w-full max-w-lg">
<MainDocumentViewer />
          </div>
          <div className="w-full max-w-3xl">
<Chat />
          </div>
       
        </main>
  
  );
}
