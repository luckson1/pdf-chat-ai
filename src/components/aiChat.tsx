"use client";

import { scrollToBottom, getSources, initialMessages } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/app/api/_trpc/client";
import { EmptyScreen } from "./empty_screen";

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
  const { messages, input,setInput, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: savedMessages ?? [],
      body: { id },
      onFinish: (message) => {
        setNewAnswer(message.content);
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
    <div className="rounded-2xl border h-[85vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
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
      </div>

      <form
        onSubmit={(e) => extendedHandleSubmit(e, input)}
        // onSubmit={handleSubmit}
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
