import { useChat } from "ai/react";

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import { ChatMessage } from "./chat_message";

const summaryMessage = {
  heading: "Summarize the source document",
  message: `Summarize all the context and extract any key points with reasoning. Highlight the core argument, and evidence`,
};
function QuestionsButtonGroup(props: { content: string ,   setInput: Dispatch<SetStateAction<string>>;}) {
    // Check if the content has question marks
    if (!props.content.includes('?')) {
      return null; // Return null (or any other appropriate JSX) if no questions are detected
    }
  
    // Splitting the content based on question marks
    const questions = props.content.split('?')
      .map(question => 
        // Remove common bullet point characters, numbers followed by dots, and trim spaces
        question + '?'
      ) 
      // Filter out any non-questions or empty strings
      .filter(question => question.endsWith('?') && question.length > 1); 
  
    return (
        <div className="mt-4 flex flex-col items-start">
        {questions.map((question, index) => (
        <Button
        key={index}
        variant="link"
        className="h-auto p-0 text-base mt-3 flex flex-row justify-start items-center text-start"
        onClick={() => props.setInput(question)}
      >
            <IconArrowRight className="mr-2 text-muted-foreground h-4 w-4" />
          <ChatMessage message=  {question} />
      
      </Button>
        ))}
      </div>
    );
  }

export function EmptyScreen({
  setInput,
  id,
}: {
  setInput: Dispatch<SetStateAction<string>>;
  id: string;
}) {
  const { messages, append } = useChat({
    body: { id },
  });

  useEffect(() => {
    const id = nanoid();
    append({
      content:
        "provide summarize the entire context in form of a bullet list of 3 well thought out questions ONLY. The questions should focus on the main concepts covered by the entire context.",
      id,
      role: "user",
    });
  }, []);
  const getAssistantMessage = useCallback(() => {
    return messages.filter((m) => m.role === "assistant")[0];
  }, [messages]);

  const content = getAssistantMessage()?.content;
  console.log(getAssistantMessage()?.content);
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">AI Chatbot!</h1>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          <Button
            variant="link"
            className="h-auto p-0 text-base"
            onClick={() => setInput(summaryMessage.message)}
          >
          <IconArrowRight className="mr-2 text-muted-foreground h-4 w-4" />
          <ChatMessage message={summaryMessage.heading} />
            
          </Button>
        
        </div>
        {content && (
            <QuestionsButtonGroup setInput={setInput} content={content} />
          )}
      </div>
    </div>
  );
}
