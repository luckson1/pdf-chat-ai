export type ChatGPTAgent = "user" | "assistant" | "system" | "function";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
  sources?: string[];
}
