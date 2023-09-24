"use client";

import { scrollToBottom, getSources, initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/app/api/_trpc/client";

export function Chat({ id }: { id: string }) {
  interface ExtendedMsg extends Message {
    sources?: string[];
  }
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: savedMessages, isSuccess } =
    api.messages.getDocumentMessages.useQuery({ id });
  const { mutate: saveMessage } = api.messages.create.useMutation();
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: savedMessages ?? [],
      body: { id },
      onFinish: (message) => {
        // setTimeout(() => {
        //   const newSources = data?.at(data?.length - 1)?.sources as string[] | undefined;
       
        //           const newMessage = { ...message, sources: newSources };
        //           saveMessage({
        //             role: newMessage.role,
        //             content: newMessage.content,
        //             documentId: id,
        //             sources:newMessage.sources
        //           });
       
        // }, 2000);

      },
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

 

 
  const extendedHandleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    handleSubmit(e);
    saveMessage({ role: "user", content: input, documentId: id });
  };
  const dataLength=data?.length as number | undefined
  const handleGetSources= useCallback((role: string, index: number)=> {
    const initialMessagesLength = savedMessages?.length;
 
  
   
  if ((initialMessagesLength && initialMessagesLength>=0) && (dataLength && dataLength>=1)) {
    console.log(dataLength)
   return getSources(
           
      role,
      index,
      data,
      initialMessagesLength
    ) 
  }
  return []
  }, [dataLength, savedMessages?.length])
  return (
    <div className="rounded-2xl border h-[85vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.length>0 && messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
           
            // Start from the third message of the assistant
            sources={handleGetSources(role, index)}
          />
        ))}
      </div>

      <form
        // onSubmit={(e) => extendedHandleSubmit(e, input)}
        onSubmit={handleSubmit}
        className="p-4 flex clear-both"
      >
        <Input
          value={input}
          placeholder={"Type to chat with AI..."}
          onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
