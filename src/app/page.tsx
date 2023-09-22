"use client";
import Dropzone from "@/components/Dropezone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./api/_trpc/client";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { Icons } from "@/components/Icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DocumentPage() {
  const [docs, setDocs] = useState<File[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const uploadToS3 = async (files: File[]) => {
    if (!files || files.length <= 0) {
      return null;
    }
    const name = files.at(0)?.name;
    const type = files.at(0)?.type;
    if (!name || !type) {
      return null;
    }
    const { data }: { data: { uploadUrl: string; key: string } } =
      await axios.get(`/api/aws/upload_file?type=${type}&name=${name}`);

    const { uploadUrl, key } = data;
    await axios.put(uploadUrl, files[0]);
    return { key, name, type };
  };
  const ctx = api.useContext();
  const { mutate: addDoc } = api.documents.addDoc.useMutation({
    onSuccess: () => {
      ctx.documents.getAll.invalidate();
    },
  });
  const { mutate: addWebDoc } = api.documents.addWebDoc.useMutation({
    onSuccess: () => {
      ctx.documents.getAll.invalidate();
    },
  });

  const { mutate: getTranscription, data: transcription } =
    api.documents.getTranscription.useMutation();
  const { mutate: addTranscription, data: id } =
    api.documents.transcribe.useMutation({
      onSuccess(id) {
        if (id) {
          getTranscription({ id: id, name: audio[0]?.name ?? id });
        }
      },
    });
  const urlSchema = z.string().url();
  const handleSubmitDocs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await uploadToS3(docs);
      if (!data) {
        setLoading(false);
        return;
      }
      addDoc(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setDocs([]);
    }
  };

  const transcribe = async (key: string) => {
    try {
      setLoading(true);
      addTranscription({ key });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const status = transcription?.status;
  const text = transcription?.text;
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const fetchTranscription = async () => {
      try {
        if (id && (status === "processing" || status === "queued")) {
          console.log("status", status);
          setTimeout(
            () => getTranscription({ id, name: audio[0]?.name ?? id }),
            5000
          );
        }
        if (status === "completed") {
          setAudio([]);
          ctx.documents.getAll.invalidate();
        }
        if (status === "error") {
          setAudio([]);
          console.log("an error occurred");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTranscription();

    // Cleanup function to clear the timeout when the component is unmounted or if dependencies change
    return () => clearTimeout(timeoutId);
  }, [id, status, text]);
  useEffect(() => {
    if (status === "processing" || status === "queued") {
      setLoading(true);
    }
    if (status === "error" || status === "completed") {
      setLoading(false);
    }
  }, [status]);
  const handleSubmitAudio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await uploadToS3(audio);
      if (!data) {
        setLoading(false);
        return;
      }
      transcribe(data.key);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitWebPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const validUrl = urlSchema.parse(url);
      addWebDoc({ url: validUrl });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUrl("");
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

  return (
    <div className="w-full h-fit flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0">
      <Tabs defaultValue="docs" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="docs">Study Documents</TabsTrigger>

          <TabsTrigger value="audio">Audio Recordings</TabsTrigger>
        </TabsList>
        <TabsContent value="docs">
          <Card className="w-full max-w-sm h-fit min-h-[500px]">
            <CardHeader>
              <CardTitle>Upload a study material</CardTitle>
              <CardDescription>
                Upload a pdf, word, text, or power point document
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-5 py-5">
              <form
                className="flex flex-col space-y-5"
                onSubmit={(e) => handleSubmitDocs(e)}
                id="docs"
              >
                <Dropzone files={docs} setFiles={setDocs} audio={false} type="a document"/>
                <Button
                  type="submit"
                  disabled={docs.length <= 0}
                  className="w-full max-w-xs"
                >
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Chat with your document
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="url">
          <Card className="w-full max-w-sm h-fit min-h-[500px]">
            <CardHeader>
              <CardTitle>Link to your online study material</CardTitle>
              <CardDescription>
                Provide a working link to a blog or news article (online pdfs
                are not valid)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  handleSubmitWebPage(e);
                }}
                className="flex w-full  max-w-sm items-center space-y-5 mt-10  flex-col"
              >
                <div className="w-full space-y-2">
                  <Label htmlFor="url">Add url to your source</Label>
                  <Input
                    type="text"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <Button
                  className="mt-8 w-full max-w-xs"
                  type="submit"
                  disabled={!urlSchema.safeParse(url).success}
                >
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Chat with your web page
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent> */}
        <TabsContent value="audio">
          <Card className="w-full max-w-sm h-fit min-h-[500px]">
            <CardHeader>
              <CardTitle>Upload an audio recording</CardTitle>
              <CardDescription>
                Record your professor lecture and chat with him/her later
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-5 py-5">
              <form
                className="flex flex-col space-y-5"
                onSubmit={(e) => handleSubmitAudio(e)}
                id="audio"
              >
                <Dropzone files={audio} setFiles={setAudio} audio={true} type="an audio recording"/>
                <Button
                  type="submit"
                  disabled={audio.length <= 0}
                  className="max-w-xs w-full"
                >
                  {loading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Transcribe and chat with audio
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="w-full max-w-4xl flex flex-col space-y-5">
        {isLoading &&
          Array.from({ length: 10 })
            .fill(0)
            .map((_, index) => (
              <Skeleton className="w-full h-16" key={index} />
            ))}
        {(!docsData || docsData.length <= 0) && !isLoading ? (
          <Card className="w-full">
            <CardHeader>No Documents</CardHeader>
          </Card>
        ) : docsData && !isLoading ? (
          <div className="flex flex-col space-y-5">
            {docsData.map((doc) => (
              <Link
                key={doc.id}
                href={{ pathname: "/documents/[id]", query: { id: doc.id } }}
              >
                <Card className="w-full">
                  <CardHeader className="underline">{doc.name}</CardHeader>
                </Card>
              </Link>
            ))}
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
        ) : null}
      </div>
    </div>
  );
}
