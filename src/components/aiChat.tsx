"use client";

import { scrollToBottom, getSources, initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useEffect, useRef, useState } from "react";
import { ChatGPTAgent } from "@/types";
import { api } from "@/app/api/_trpc/client";

export function Chat({ id }: { id: string }) {
  interface ExtendedMsg extends Message {
    sources?: string[];
  }
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [extendedMessages, setExtendedMessages]=useState<ExtendedMsg[]>([])
  const { data: savedMessages, isSuccess } =
    api.messages.getDocumentMessages.useQuery({ id });
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: savedMessages,
      body: { id },
      onFinish: (message) => {
        const newSources=(data[data?.length-1]?.sources) as string[] | undefined
     
    const newMessage={...message, sources: newSources}
 saveMessage({role: newMessage.role, content: newMessage.content, documentId: id})
      },
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  const { mutate: saveMessage } = api.messages.create.useMutation();

  const extendedHnadleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    handleSubmit(e);
    saveMessage({ role: "user", content: input, documentId: id });
  };
  return (
    <div className="rounded-2xl border h-[85vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ id, role, content}: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={getSources(data, role, index, savedMessages?.length ?? 0)}
          />
        ))}
      </div>

      <form
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
