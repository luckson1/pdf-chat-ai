import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { api } from "@/app/api/_trpc/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import ToolTipComponent from "./tooltip_component";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

import { ChevronLeft, ChevronRight, PenIcon, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import AlertDialogComponent from "./alert_dialog_component";
import { customFormat } from "@/lib/utils";

export default function DocsCard() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
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
  const ctx = api.useContext();
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
    setValue,
  } = useForm<TNameSchema>({
    resolver: zodResolver(NameSchema),
  });
  const { toast } = useToast();
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
  return (
    <div className="w-full flex flex-col space-y-5 md:hidden">
      {isLoading && (
        <div className=" w-full max-w-4xl grid grid-col gap-y-2">
          {Array.from({ length: itemsPerPage })
            .fill(0)
            .map((_, index) => (
              <Skeleton
                className="w-full p-2 h-20 overflow-hidden"
                key={index}
              />
            ))}
        </div>
      )}
      {(!docsData || docsData.length <= 0) && !isLoading ? (
        <Card className="w-full p-2 h-20">
          <CardHeader>No Documents Found</CardHeader>
        </Card>
      ) : docsData && !isLoading ? (
        <div className="w-full max-w-4xl grid grid-cols-1 gap-y-2 h-auto">
          {docsData.map((doc) => (
            <div
              className="w-full p-2 h-auto overflow-hidden flex flex-col space-y-1 place-items-center"
              key={doc.id}
            >
              <div className="flex flex-row justify-between items-center w-full">
             
                
                    <Link
                     
                      href={{
                        pathname: "/documents/[id]",
                        query: { id: doc.id },
                      }}
                    >
                         <CardTitle className="w-4/6 truncate"></CardTitle>
                      {doc.name}
                    </Link>
                 
             
                <CardDescription className=" flex flex-row justify-between items-center w-1/6">
                {customFormat(new Date(doc.createdAt))}
                </CardDescription>
              </div>

              <div className="flex flex-row justify-between items-center w-full">
                <div className="w-1/2">

                </div>
                <ToolTipComponent content="Click to start chatting with this document">
                  <Link
                    href={{
                      pathname: "/documents/[id]",
                      query: { id: doc.id },
                    }}
                    className={buttonVariants({
                      className: "w-fit",
                      variant: 'link',
                      size: "sm",
                    })}
                  >
                    Chat
                    <ChevronRight className="h-5 w-5 ml-1.5" />
                  </Link>
                </ToolTipComponent>
              </div>
            </div>
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
  );
}
