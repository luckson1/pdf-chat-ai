"use client";
import Dropzone from "@/components/Dropezone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/_trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DocsCard from "@/components/docs_card";
import ResourceTable from "@/components/source_tables";


export default function DocumentPage() {
  const [docs, setDocs] = useState<File[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const sizeLimit = 4000000;
  const { toast } = useToast();
  const session = useSession();
  const isProMember = session.data?.user.isPro;
  const uploadToS3 = async (files: File[]) => {
    if (!files || files.length <= 0) {
      return null;
    }
    const name = files.at(0)?.name;
    const type = files.at(0)?.type;
    const size = files.at(0)?.size;

    if (!name || !type || !size) {
      return null;
    }
    const isNotAllowedToUploadLargeFiles=(size >= sizeLimit) && !isProMember
    if (isNotAllowedToUploadLargeFiles) {
      toast({
        title: "File larger than 4MB.",
        description: "Upgrade to upload larger files",
        variant: "destructive",
        action: <ToastAction altText="Try again">Upgrade</ToastAction>,
      });
      return;
    }
try {
  const res= await axios.get(`/api/aws/upload_file?type=${type}&name=${name}`)
 
    const data: { uploadUrl: string; key: string } =
     res.data
   

 
    const { uploadUrl, key } = data;
    await axios.put(uploadUrl, files[0]);
    return { key, name, type };
} catch (error) {
  toast({
    title: "Upload failed",
    description: "Failed to upload",
    variant: "destructive",
    action: <ToastAction altText="Try again">Try Again</ToastAction>,
  });
}
  };
  const ctx = api.useContext();
  const router = useRouter();
  const { mutate: addDoc } = api.documents.addDoc.useMutation({
    onSettled: () => {
      ctx.documents.getAll.invalidate();
      setIsUploading(false);
      setDocs([]);
    },
    onError: (error) => {
      toast({
        description: `Something went wrong ${error.message}`,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    },
    onSuccess(data) {
      if (data) {
        router.push(`/documents/[id]?id=${data.id}`);
      }
    },
  });


  const { mutate: getTranscription, data: transcription } =
    api.documents.getTranscription.useMutation({
      onSuccess(data) {
        if (data?.status === "completed" && data?.documentId) {
          ctx.documents.getAll.invalidate();
          router.push(`/documents/[id]?id=${data.documentId}`);
        }
        
      },
      onError: () => {
        toast({
          description: "Something went wrong",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
      },
    });
  const {
    mutate: addTranscription,
    data: id,
    isLoading: isTranscribing,
  } = api.documents.transcribe.useMutation({
    onSuccess(id) {
      if (id) {
        getTranscription({ id: id, name: audio[0]?.name ?? id });
      }
    },
    onError: () => {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    },
  });

  const handleSubmitDocs = async (docs: File[]) => {
  
    try {
      setIsUploading(true);
    
      const data = await uploadToS3(docs);
      if (!data) {
       
        setIsUploading(false);

        return;
      } else {

        addDoc(data);
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  };

  const transcribe = async (key: string) => {
    try {
      setIsUploading(true);
      addTranscription({ key });
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });

      setIsUploading(false);
    }
  };
  const status = transcription?.status;
  const text = transcription?.text;
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchTranscription = async () => {
      try {
        if (id && (status === "processing" || status === "queued")) {
          setTimeout(
            () => getTranscription({ id, name: audio[0]?.name ?? id }),
            5000
          );
        }
        if (status === "completed") {

          setAudio([]);
        }
        if (status === "error") {
          setAudio([]);
          toast({
            description: "Something went wrong",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try Again</ToastAction>,
          });
        }
      } catch (error) {
        toast({
          description: "Something went wrong",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try Again</ToastAction>,
        });
      }
    };

    fetchTranscription();

    // Cleanup function to clear the timeout when the component is unmounted or if dependencies change
    return () => clearTimeout(timeoutId);
  }, [id, status, text]);
  useEffect(() => {
    if (status === "processing" || status === "queued") {
      setIsUploading(true);
    }
    if (status === "error" || status === "completed") {
      setIsUploading(false);
    }
  }, [status]);
  const handleSubmitAudio = async (audio:File[]) => {
    try {
      setIsUploading(true);
      const data = await uploadToS3(audio);
      if (!data) {
        setIsUploading(false);

        return;
      }
      transcribe(data.key);
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  };



  return (
    <div className="w-full h-fit flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-5 md:space-y-0">
      <Tabs defaultValue="docs" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="docs">Study Documents</TabsTrigger>

          <TabsTrigger value="audio">Audio Recordings</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <Card className="w-full max-w-sm h-auto">
            <CardHeader>
              <CardTitle>Upload a study material</CardTitle>
              <CardDescription>
                Upload a pdf, word, text, or power point document
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-5 py-5">
            
                <Dropzone
                  files={docs}
                  setFiles={setDocs}
                  audio={false}
                  type="a document"
                  handleSubmit={handleSubmitDocs}
                  setIsUploading={setIsUploading}
                  isUploading={isUploading}
                />
              
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audio">
          <Card className="w-full max-w-sm h-fit min-h-[500px]">
            <CardHeader>
              <CardTitle>Upload an audio recording</CardTitle>
              <CardDescription>
                Record your professor lecture and chat with him/her later
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-5 py-5">
             
                <Dropzone
                  files={audio}
                  setFiles={setAudio}
                  audio={true}
                  type="an audio recording"
                  handleSubmit={handleSubmitAudio} 
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
            
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
     <div className="w-full">
<DocsCard />
<ResourceTable />
     </div>
    </div>
  );
}
