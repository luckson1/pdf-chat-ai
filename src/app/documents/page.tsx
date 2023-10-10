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
import Webform from "@/components/webform";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";

export default function DocumentPage() {
  const [docFiles, setDocFiles] = useState<File[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
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
    const isNotAllowedToUploadLargeFiles = size >= sizeLimit && !isProMember;
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
      const res = await axios.get(
        `/api/aws/upload_file?type=${type}&name=${name}`
      );

      const data: { uploadUrl: string; key: string } = res.data;

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
      setDocFiles([]);
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
        getTranscription({ id: id, name: audioFiles[0]?.name ?? id });
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
            () => getTranscription({ id, name: audioFiles[0]?.name ?? id }),
            5000
          );
        }
        if (status === "completed") {
          setAudioFiles([]);
        }
        if (status === "error") {
          setAudioFiles([]);
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
  const handleSubmit = async (docs: File[]) => {
    try {
      setIsUploading(true);

      const data = await uploadToS3(docs);
      if (!data) {
        setIsUploading(false);

        return;
      } else {
        const type = data.type;
        const isAudio = type.startsWith("audio/");
        const isVideo = type.startsWith("video/");
        const isMultimedia = isAudio || isVideo;
        isMultimedia ? transcribe(data.key) : addDoc(data);
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    }
  };

  const importIcons = [
    { name: "Notion", icon: Icons.notion },
    { name: "Google Drive", icon: Icons.googleDrive },
    { name: "One Drive", icon: Icons.oneDrove },
    {name: "Zoom", icon: Icons.zoom},
    {name: "Google Meet", icon: Icons.googleMeet},
    {name: "Teams", icon: Icons.teams}
  ];

  return (
    <div className="w-full h-fit flex flex-col space-x-0  space-y-5 justify-center items-center ">
      <Tabs defaultValue="docs" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="docs">Add resource</TabsTrigger>

          <TabsTrigger value="audio">Connect data providers</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <Card className="w-full max-w-3xl h-auto ">
            <CardHeader>
              <CardTitle>
                Add a source by uploading a file or providing a link
              </CardTitle>
              <CardDescription>
                Supported file: pdfs, office(word, slides, excel) audio, and
                video files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full flex-col md:flex-row md:space-x-5 space-x-0 space-y-5 md:space-y-0">
                <Dropzone
                  files={docFiles}
                  setFiles={setDocFiles}
                  handleSubmit={handleSubmit}
                  setIsUploading={setIsUploading}
                  isUploading={isUploading}
                />
                <div className="relative md:hidden blocl">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">
                      Or
                    </span>
                  </div>
                </div>
                <div className=" relative  w-10 hidden md:block">
                  <div className="h-full flex justify-center">
                    <span className="h-full border-l " />
                  </div>
                  <div className=" flex items-center justify-center h-full text-xs uppercase absolute inset-0">
                    <span className="bg-background text-muted-foreground px-2 absolute ">
                      Or
                    </span>
                  </div>
                </div>

                <Webform />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audio">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>
                Connect with resources from other apps, soon...
              </CardTitle>
              <CardDescription>Cooming soon...</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {importIcons.map((icon) => (
                <div
                  className={buttonVariants({
                    variant: "secondary",
                    className:
                      "flex flex-row justify-between items-center w-full",
                  })}
                  key={icon.name}
                >
                  <icon.icon className=" w-5 h-5" /> {icon.name}
                </div>
              ))}
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
