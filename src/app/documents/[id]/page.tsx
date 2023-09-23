'use client'
import { Chat } from "@/components/aiChat";
import MainDocumentViewer from "@/components/documentViewer";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const params=useSearchParams()
  const id=params?.get('id')
  if(!id) return null
  return (
  
        <main className="w-full flex flex-col-reverse lg:flex-row space-y-5 md:space-y-0 md:space-x-5">
          <div className="w-full max-w-4xl h-auto">
<MainDocumentViewer />
          </div>
          <div className="w-full max-w-xl">
<Chat id={id}/>
          </div>
       
        </main>
  
  );
}
