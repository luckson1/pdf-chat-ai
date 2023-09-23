// import Balancer from "react-wrap-balancer";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChatGPTMessage } from "@/types";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import ReactMarkdown from "react-markdown";
// import { ChatMessage } from "./chat_message";
// import { User2Icon } from "lucide-react";
// import { IconOpenAI } from "./ui/icons";

// // util helper to convert new lines to <br /> tags
// const convertNewLines = (text: string) =>
//   text.split("\n").map((line, i) => (
//     <span key={i}>
//       {line}
//       <br />
//     </span>
//   ));

// export function ChatLine({
//   role = "assistant",
//   content,
//   sources,
// }: ChatGPTMessage) {
//   if (!content) {
//     return null;
//   }


//   return (
//     <div>
//       <Card className="mb-2">
//         <CardHeader>
//           <CardTitle
//             className={
//               role != "assistant"
//                 ? "text-amber-500 dark:text-amber-200"
//                 : "text-blue-500 dark:text-blue-200"
//             }
//           >
//             {role === 'user' ? <User2Icon /> : <IconOpenAI />}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="text-sm">
//         <ChatMessage message={content} />
//         </CardContent>
//         <CardFooter>
//           <CardDescription className="w-full">
//             {sources ? (
//               <Accordion type="single" collapsible className="w-full">
//                 {sources.map((source, index) => (
//                   <AccordionItem value={`source-${index}`} key={index}>
//                     <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
//                     <AccordionContent>
//                       <ReactMarkdown linkTarget="_blank">
//                         {sanitizeAndFormatText(source)}
//                       </ReactMarkdown>
//                     </AccordionContent>
//                   </AccordionItem>
//                 ))}
//               </Accordion>
//             ) : (
//               <></>
//             )}
//           </CardDescription>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import { IconOpenAI } from "./ui/icons";
import { ChatMessage } from "./chat_message";



import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  content: Message['content']
}

export function ChatMessageActions({
  content,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(content)
  }

  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  )
}
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

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
  const formattedMessage = convertNewLines(content);
  return (
    <div>
      <Card className="mb-2">
        <CardHeader className="flex flex-row justify-between items-center">
        <div
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role === 'user' ? <User2Icon /> : <IconOpenAI />}
        
          </div>
          <ChatMessageActions content={content}/>
        </CardHeader>
        <CardContent className="text-sm">
        <ChatMessage message={content} />
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown linkTarget="_blank">
                        {formattedText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}