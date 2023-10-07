import { type UseChatHelpers } from 'ai/react'
import { PromptForm } from '@/components/prompt_form'



export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'isLoading'
    | 'input'
    | 'setInput'
  > {
  id?: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>, input: string) => void;
}

export function ChatPanel({
  isLoading,
  input,
  setInput,
  onSubmit
}: ChatPanelProps) {
  return (
  
     
          <PromptForm
            onSubmit={onSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
   
   
  )
}