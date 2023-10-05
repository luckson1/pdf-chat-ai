
import { Message } from "ai";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: 'end',
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

// Reference:
// github.com/hwchase17/langchainjs/blob/357d6fccfc78f1332b54d2302d92e12f0861c12c/examples/src/guides/expression_language/cookbook_conversational_retrieval.ts#L61
export const formatChatHistory = (chatHistory: [string, string][]) => {
  const formattedDialogueTurns = chatHistory.map(
    (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
  );

  return formattedDialogueTurns.join("\n");
};

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

// Default UI Message
export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hi! I am your assistant. I am happy to help with your questions .",
  },
];

interface Data {
  sources: string[];
  metadata: {
    pageNumber: number

  
  }
}

// Maps the sources with the right ai-message
export const getSources = ( role: string, index: number, data: Data[], initialMessagesLength: number) => {
  const initialMessagesLengthPlusOne=initialMessagesLength+1
  if (role === "assistant" && index>=initialMessagesLengthPlusOne &&  (index - initialMessagesLengthPlusOne) % 2 === 0) {
  
    const sourcesIndex = index===1? 0: (index - initialMessagesLengthPlusOne)/2;
    if (data[sourcesIndex] && data[sourcesIndex]?.sources) {
      console.log(data[sourcesIndex]?.metadata)
      return data[sourcesIndex]?.sources ?? []
    }
  }

  return [];
};

export function constructMetadata({
  title = "ChatPaperz - Student's best research tool",
  description = siteConfig.description,
  image = 'https://res.cloudinary.com/dhciks96e/image/upload/v1696276515/chatpaperzshare_d6vjxb.png',
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@JackBatian"
    },
    icons,
    metadataBase: new URL('https://chatpaperz.com'),
    themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}