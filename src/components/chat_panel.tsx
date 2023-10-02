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
    <div className=" bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
   
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-md sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={onSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
         
        </div>
      </div>
    </div>
  )
}