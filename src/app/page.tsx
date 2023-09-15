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
import { api } from "./api/_trpc/client";
import Link from "next/link";

export default function DocumentPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const uploadToS3 = async () => {
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
  const { data: document, mutate: addDoc } = api.documents.addDoc.useMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await uploadToS3();
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add a source</CardTitle>
          <CardDescription>
            Upload a pdf, word, txt, epub or power point
          </CardDescription>
          <CardContent className="flex flex-col space-y-5 py-5">
            <form
              className="flex flex-col space-y-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Dropzone files={files} setFiles={setFiles} />
              <Button type="submit" disabled={files.length <= 0}>
                Upload to add source
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Or provide a link
                </span>
              </div>
            </div>
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
              className="flex w-full  max-w-sm items-center space-x-2 mt-10"
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
              <Button className="mt-8" type="submit">
                Add
              </Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
      <div className="w-full max-w-4xl flex flex-col space-y-5">
        {isLoading &&
          Array.from({ length: 5 })
            .fill(0)
            .map((_, index) => (
              <Skeleton className="w-full h-16" key={index} />
            ))}
        {(!docsData || docsData.length <= 0) && !isLoading ? (
          <Card className="w-full">
            <CardContent>No Documents</CardContent>
          </Card>
        ) : docsData  && !isLoading ? (docsData.map(doc=> (
          <Link key={doc.id} href={{     pathname: '/documents/[id]',
          query: { id: doc.id }}}>
          <Card className="w-full h-12">
<CardContent>
  {doc.name}
</CardContent>
          </Card>
          </Link>
        ))): null}
      </div>
    </div>
  );
}
