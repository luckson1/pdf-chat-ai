"use client";
import { Chat } from "@/components/aiChat";
import { MainDocumentViewer } from "@/components/documentViewer";
import { Card, CardContent } from "@/components/ui/card";
import { XCircleIcon} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [numPages, setNumPages] = useState<number>();
  const params = useSearchParams();
  const id = params?.get("id");
  if (!id) return null;
  const exceededPageCount = numPages ? numPages > 25 : false;
  return (
    <main className="w-full flex flex-col-reverse lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5">
      <div className="w-full max-w-3xl h-auto">
        <MainDocumentViewer
          id={id}
          numPages={numPages}
          setNumPages={setNumPages}
        />
      </div>
      <div className="w-full max-w-3xl">
        {!exceededPageCount && <Chat id={id} />}
        {exceededPageCount && (
          <Card className="w-full h-[85vh]">
            <CardContent className="flex flex-row space-x-4 justify-center items-center text-destructive w-full h-full text-xl">
              <XCircleIcon className="w-8 h-8" /> Exceeds 25 pages. Please Upgrade to contininue
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
