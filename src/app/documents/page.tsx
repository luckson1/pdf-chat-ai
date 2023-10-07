"use client";
import Dropzone from "@/components/Dropezone";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/_trpc/client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { Icons } from "@/components/Icons";
import { ChevronLeft, ChevronRight, Files, PenIcon, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ToolTipComponent from "@/components/tooltip_component";

export default function DocumentPage() {
  const [docs, setDocs] = useState<File[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
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
  const { mutate: del } = api.documents.deleteOne.useMutation({
    onSuccess: () => {
      ctx.documents.getAll.invalidate();
    },
    onError: () => {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
    },
  });
  const { mutate: rename } = api.documents.changeName.useMutation({
    onSuccess: () => {
      ctx.documents.getAll.invalidate();
    },
    onError: () => {
      toast({
        description: "Something went wrong",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      });
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

  const {
    data: docsData,
    isLoading,
    isPreviousData,
  } = api.documents.getAll.useQuery(
    {
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    },
    { keepPreviousData: true }
  );
  const hasMore = docsData && docsData?.length < itemsPerPage;

  useEffect(() => {
    if (!isPreviousData && hasMore) {
      ctx.documents.getAll.prefetch({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      });
    }
  }, [isPreviousData, page, hasMore]);
  const NameSchema = z.object({
    name: z.string(),
  });

  type TNameSchema = z.infer<typeof NameSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TNameSchema>({
    resolver: zodResolver(NameSchema),
  });

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
      <div className="w-full flex flex-col space-y-5">
        {isLoading && (
          <div className=" w-full max-w-4xl grid grid-row lg:grid-cols-2 gap-2">
            {Array.from({ length: itemsPerPage })
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  className="w-full max-w-sm h-32 overflow-hidden"
                  key={index}
                />
              ))}
          </div>
        )}
        {(!docsData || docsData.length <= 0) && !isLoading  ? (
          <Card className="w-full max-w-sm h-32">
            <CardHeader>No Documents</CardHeader>
          </Card>
        ) : docsData && !isLoading ? (
          <div className="w-full max-w-4xl grid grid-row lg:grid-cols-2 gap-2">
            {docsData.map((doc) => (
              <Card
                className="w-full max-w-sm h-auto overflow-hidden"
                key={doc.id}
              >
                <CardHeader className="underline flex flex-row justify-between items-center w-full">
                  <CardTitle className="w-4/6 truncate">
                    <ToolTipComponent content="Name of the document">
                      <Link
                        className={buttonVariants({
                          variant: "link",
                          className: "truncate",
                        })}
                    
                        href={{
                          pathname: "/documents/[id]",
                          query: { id: doc.id },
                        }}
                      >
                        {doc.name}
                      </Link>
                    </ToolTipComponent>
                  </CardTitle>
                  <div className=" flex flex-row justify-between items-center w-1/6">
                  <ToolTipComponent content="Edit name of document">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <PenIcon className="w-5 h-5 text-primary" onClick={()=>setValue('name', doc.name)}/>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Name</AlertDialogTitle>
                          <AlertDialogDescription>
                            Change the name of the file. Click save when you are
                            done.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <form
                          className="grid gap-4 py-4"
                          onSubmit={handleSubmit((data) =>
                            rename({ id: doc.id, name: data.name })
                          )}
                        >
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              {...register("name")}
                              defaultValue={doc.name}
                              className="col-span-3"
                            />
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel type="button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction type="submit">
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </form>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ToolTipComponent>
                  <ToolTipComponent content="Delete document">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete the document?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the file.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              del({ id: doc.id });
                            }}
                            className="bg-destructive hover:bg-destructive/10"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </ToolTipComponent>
                  </div>
              
                </CardHeader>

                <CardFooter className="flex flex-row justify-between items-center">
                  <ToolTipComponent content="Document's number of chats">
                    <Link
                      className="flex flex-row space-x-1 items-start"
                      key={doc.id}
                      href={{
                        pathname: "/documents/[id]",
                        query: { id: doc.id },
                      }}
                    >
                      <ChatBubbleIcon className="w-5 h-5" />
                      <p className="text-xs font-extralight">
                        {doc.Message.length}
                      </p>
                    </Link>
                  </ToolTipComponent>
                  <ToolTipComponent content="Click to start chatting with this document">
                    <Link
                      href={{
                        pathname: "/documents/[id]",
                        query: { id: doc.id },
                      }}
                      className={buttonVariants({
                        className: "w-fit",
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      Open
                      <ChevronRight className="h-5 w-5 ml-1.5" />
                    </Link>
                  </ToolTipComponent>
                
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}
        <div className="flex flex-row w-full justify-center items-center text-sm space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <span>Page {page}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={hasMore}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
