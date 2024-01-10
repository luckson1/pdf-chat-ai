"use client";
import { Chat } from "@/components/aiChat";
import { MainDocumentViewer } from "@/components/documentViewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { XCircleIcon} from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [numPages, setNumPages] = useState<number>();
  const params = useSearchParams();
  const id = params?.get("id");
 
  const session=useSession()
  const isProMember=session.data?.user.isPro
  const pageLimit=20
  const exceededPageCount = numPages ? (!isProMember && numPages > pageLimit ): false;
  if (!id) return null;

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
            <CardContent className="flex flex-col space-y-4 justify-center items-center text-destructive w-full h-full text-xl">
            <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {`The document exceeds ${pageLimit} pages. Please upgrade to chat`}
      </AlertDescription>
    </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
