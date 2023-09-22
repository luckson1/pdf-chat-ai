"use client";

import { useEffect, useRef, useState } from "react";
import { InputMessage } from "./input-message";
import { scrollToBottom, initialMessage } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { ChatGPTMessage } from "@/types";
import { api } from "@/app/api/_trpc/client";

export function Chat({id}: {id:string}) {

  const endpoint = "/api/chat";
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessage);
  const [chatHistory, setChatHistory] = useState<[string, string][]>([]);
  const [streamingAIContent, setStreamingAIContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const updateMessages = (message: ChatGPTMessage) => {
    setMessages((previousMessages) => [...previousMessages, message]);
    setTimeout(() => scrollToBottom(containerRef), 100);
  };

  const updateChatHistory = (question: string, answer: string) => {
    setChatHistory((previousHistory) => [
      ...previousHistory,
      [question, answer],
    ]);
  };

  const updateStreamingAIContent = (streamingAIContent: string) => {
    setStreamingAIContent(streamingAIContent);
    setTimeout(() => scrollToBottom(containerRef), 150);
  };
const {data: savedMessages, isSuccess}=api.messages.getDocumentMessages.useQuery({id })
const {data: savedHistory, isSuccess: isHistorySuccess}=api.QAPairs.getDocChatHistory.useQuery({id })
const {mutate: saveMessage}=api.messages.create.useMutation()
const {mutate: addToHistory}=api.QAPairs.create.useMutation()
useEffect(() => {
  if (isSuccess && savedMessages) {
    setMessages((previousMessages) => [...previousMessages, ...savedMessages]);
  }
}, [isSuccess]);
useEffect(() => {
  if (isHistorySuccess && savedHistory) {
 savedHistory.map(hist=> {
  setChatHistory((previousHistory) => [
    ...previousHistory,
    [hist.question, hist.answer],
  ]);
 })
  }
}, [isHistorySuccess]);
  const handleStreamEnd = (
    question: string,
    streamingAIContent: string,
    sourceDocuments: string
  ) => {
    const sources = JSON.parse(sourceDocuments);

    // Add the streamed message as the AI response
    // And clear the streamingAIContent state
    updateMessages({
      role: "assistant",
      content: streamingAIContent,
      sources,
    });
    saveMessage({ role: "assistant",
    content: streamingAIContent,
    sources, documentId: id})
    updateStreamingAIContent("");
    updateChatHistory(question, streamingAIContent);
    addToHistory({question, answer:streamingAIContent, documentId:id})
  };

  // send message to API /api/chat endpoint
  const sendQuestion = async (question: string) => {
    setIsLoading(true);
    updateMessages({ role: "user", content: question });
saveMessage({role: "user", content:question, documentId:id})
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory,
          id
        }),
      });

      const reader = response?.body?.getReader();
      let streamingAIContent = "";
      let tokensEnded = false;
      let sourceDocuments = "";

      while (true) {
        const { done, value } = (await reader?.read()) || {};

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        if (text === "tokens-ended") {
         
          tokensEnded = true;
          console.log(text)
        } else if (tokensEnded) {
          sourceDocuments = text;
        } else {
          streamingAIContent = streamingAIContent + text;
          updateStreamingAIContent(streamingAIContent);
        }
      }

      handleStreamEnd(question, streamingAIContent, sourceDocuments);
    } catch (error) {
      console.log("Error occured ", error);
    } finally {
      setIsLoading(false);

    }
  };

  let placeholder = "Type a message to start ...";

  if (messages.length > 2) {
    placeholder = "Type to continue your conversation";
  }

  return (
    <div className="rounded-2xl border h-[85vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ content, role, sources }, index) => (
          <ChatLine
            key={index}
            role={role}
            content={content}
            sources={sources}
          />
        ))}
        {streamingAIContent ? (
          <ChatLine role={"assistant"} content={streamingAIContent} />
        ) : (
          <></>
        )}
      </div>

      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendQuestion}
        placeholder={placeholder}
        isLoading={isLoading}
      />
    </div>
  );
}
