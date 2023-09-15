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
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../api/_trpc/client";

export default function DocumentPage() {
  const [docs, setDocs] = useState<File[]>([]);
  const [audio, setAudio] = useState<File[]>([]);
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const uploadToS3 = async (files:  File[]) => {
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
    const d = await axios.put(uploadUrl, files[0]);
    return { key, name, type };
  };
  const ctx=api.useContext()
  const {  mutate: addDoc } = api.documents.addDoc.useMutation( {
    onSuccess: ()=> {
      ctx.documents.getAll.invalidate()
    }
  });
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
    } catch (error) {}
  };
  const { data: docsData, isLoading } = api.documents.getAll.useQuery();
  return (
    <div className="w-full h-fit flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0">
        <Tabs defaultValue="docs" className="w-full max-w-sm">
      <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="docs">Documents</TabsTrigger>
        <TabsTrigger value="url"> Online Article</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        
      </TabsList>
      <TabsContent value="docs">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Upload a study material</CardTitle>
          <CardDescription>
            Upload a pdf, word, text, epub or power point
          </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-5 py-5">
            <form
              className="flex flex-col space-y-5"
              onSubmit={(e) => handleSubmitDocs(e)}
              id="docs"
            >
              <Dropzone files={docs} setFiles={setDocs} audio={false}/>
              <Button type="submit" disabled={docs.length <= 0}>
                chat with your document
              </Button>
            </form>
          
           
          </CardContent>
      
      </Card>
      </TabsContent>
      <TabsContent value='url'>
        <Card>
          <CardHeader>
            <CardTitle>
Link to your online study material
            </CardTitle>
            <CardDescription>
Provide a working  link to a blog or news article (online pdfs are not valid)
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form
              onSubmit={(e) => {
                try {
                  e.preventDefault();
                  // setLoading(true)
                } catch (error) {
                } finally {
                  setLoading(false);
                }
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
              <Button className="mt-8 w-full" type="submit">
                Chat with your web page
              </Button>
            </form>
          </CardContent>
        </Card>

      </TabsContent>
      <TabsContent value="audio">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Upload an audio recording</CardTitle>
          <CardDescription>
            Record your professor lecture and chat with him/her later
          </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-5 py-5">
            <form
              className="flex flex-col space-y-5"
              // onSubmit={(e) => handleSubmitDocs(e)}
              id="audio"
            >
              <Dropzone files={audio} setFiles={setAudio} audio={true}/>
              <Button type="submit" disabled={audio.length <= 0}>
              Chat with your audio
              </Button>
            </form>
          
           
          </CardContent>
      
      </Card>
      </TabsContent>
      </Tabs>
      <div className="w-full max-w-4xl flex flex-col space-y-5">
        {isLoading &&
          Array.from({ length: 5 })
            .fill(0)
            .map((_, index) => (
              <Skeleton className="w-full h-16" key={index} />
            ))}
        {(!docsData || docsData.length <= 0) && !isLoading ? (
          <Card className="w-full">
          
            <CardHeader>No Documents</CardHeader>
          </Card>
        ) : docsData  && !isLoading ? (docsData.map(doc=> (
          <Link key={doc.id} href={{     pathname: '/documents/[id]',
          query: { id: doc.id }}}>
          <Card className="w-full h-12">
<CardHeader>
  {doc.name}
</CardHeader>
          </Card>
          </Link>
        ))): null}
      </div>
    </div>
  );
}
