import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';
import { api } from '@/app/api/_trpc/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import ToolTipComponent from './tooltip_component';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

import { ChevronLeft, ChevronRight, PenIcon, Trash2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { ToastAction } from './ui/toast';
import { useToast } from './ui/use-toast';
import AlertDialogComponent from './alert_dialog_component';

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
    const ctx=api.useContext()
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
     <AlertDialogComponent form='edit' description='Edit the name of the resource. Click save when done' title="Edit Name" trigger={<PenIcon /> } action={null}>
     <form
     id='edit'
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
    </form>
     </AlertDialogComponent>
              </ToolTipComponent>
              <ToolTipComponent content="Delete document">
              <AlertDialogComponent form='edit' description='This action cannot be undone. This will permanently
                        delete the file.' title="Are you sure you want to delete the document?" trigger={    <Trash2 className="w-5 h-5 text-destructive" />} action={ ()=>del({ id: doc.id })}/>
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
  )
}
