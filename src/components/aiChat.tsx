"use client";

import { scrollToBottom, getSources } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/app/api/_trpc/client";
import { EmptyScreen } from "./empty_screen";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { ChatPanel } from "./chat_panel";

export function Chat({ id }: { id: string }) {
  interface ExtendedMsg extends Message {
    sources?: string[];
  }
  const [newAnswer, setNewAnswer] = useState<string>();
  const [newQuestion, setNewQuestion] = useState<string>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { data: savedMessages } = api.messages.getDocumentMessages.useQuery({
    id,
  });
  const { mutate: saveMessage } = api.messages.create.useMutation();
  const {toast}=useToast()
  const { messages, input,setInput, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: savedMessages ?? [],
      body: { id },
      onFinish: (message) => {
        setNewAnswer(message.content);
      },
      onError(message) {
      toast({
        description: `Something went wrong ${message.message}`,
        variant:'destructive',
        action: <ToastAction altText="Try again">Try Again</ToastAction>,
      })
      },
      onResponse(response) {
        if(response?.status===429) {
          toast({
            description: `You have exceeded your daily limit. Please upgrade`,
            variant:'destructive',
            action: <ToastAction altText="Try again">Try Again</ToastAction>,
          })
        }
      },
    });
  const saveQuestionAndAnswer = (
    newQuestion: string,
    newAnswer: string,
    newSources?: string[]
  ) => {
    saveMessage({ role: "user", content: newQuestion, documentId: id });
    saveMessage({
      role: "assistant",
      content: newAnswer,
      documentId: id,
      sources: newSources,
    });
    setNewQuestion(undefined);
    setNewAnswer(undefined);
  };

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);
  const dataLength = data?.length as number | undefined;

  useEffect(() => {
    const newSources = data?.at((dataLength ?? 0) - 1)?.sources as
      | string[]
      | undefined;
    if (newAnswer && newSources && newQuestion) {
      setTimeout(
        () => saveQuestionAndAnswer(newQuestion, newAnswer, newSources),
        100
      );
    }
  }, [newAnswer, id, dataLength, newQuestion]);

  const extendedHandleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    handleSubmit(e);
    setNewQuestion(input);
  };
  const handleGetSources = useCallback(
    (role: string, index: number) => {
      const initialMessagesLength = savedMessages?.length;

      if (dataLength) {
        return getSources(role, index, data, initialMessagesLength ?? 0);
      }
      return [];
    },
    [dataLength, savedMessages?.length]
  );
  return (
    <div className="rounded-2xl border h-[85vh] flex flex-col justify-between" >
      <div className="p-6 overflow-auto" ref={containerRef} >
        { messages.length<=0 && <EmptyScreen setInput={setInput} id={id}/>}
        {messages.length > 0 &&
          messages.map(({ id, role, content, sources }: ExtendedMsg, index) => (
            <ChatLine
              key={id}
              role={role}
              content={content}
              // Start from the third message of the assistant
              sources={sources ?? handleGetSources(role, index)}
            />
          ))}
            <ChatPanel onSubmit={extendedHandleSubmit} input={input} isLoading={isLoading} setInput={setInput} />
      </div>

  
    </div>
  );
}
