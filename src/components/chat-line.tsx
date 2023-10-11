"use client";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import { ChatMessage, ChatMessageActions } from "./chat_message";
import { MemoizedReactMarkdown } from "./markdown";
import { CodeBlock } from "./ui/codeblock";

interface ChatLineProps extends Partial<Message> {
  sources?: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources,
}: ChatLineProps) {
  if (!content) {
    return null;
  }
  return (
    <div className="flex w-full flex-col space-y-2">
      <ChatMessage message={content} role={role} />

      {sources && sources.length ? (
        <Accordion type="single" collapsible className="w-full">
          {sources.map((source, index) => (
            <AccordionItem value={`source-${index}`} key={index}>
              <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
              <AccordionContent>
                <div className="flex-1 px-1  space-y-2 overflow-hidden">
                  <MemoizedReactMarkdown
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      p({ children }) {
                        return <p className="mb-2 last:mb-0">{children}</p>;
                      },
                      code({ node, inline, className, children, ...props }) {
                        if (children.length) {
                          if (children[0] == "▍") {
                            return (
                              <span className="mt-1 cursor-default animate-pulse">
                                ▍
                              </span>
                            );
                          }

                          children[0] = (children[0] as string).replace(
                            "`▍`",
                            "▍"
                          );
                        }

                        const match = /language-(\w+)/.exec(className || "");

                        if (inline) {
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }

                        return (
                          <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ""}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        );
                      },
                    }}
                  >
                    {source}
                  </MemoizedReactMarkdown>
                  <ChatMessageActions content={source} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <></>
      )}
    </div>
  );
}
