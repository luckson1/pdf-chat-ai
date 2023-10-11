
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { ChatRole } from '@prisma/client'
import { IconCheck, IconCopy, IconOpenAI, IconUser } from './ui/icons'
import { Button } from './ui/button'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { Message } from 'ai'


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

export interface ChatMessageProps {
  message: string
  role: ChatRole
}

export function ChatMessage({ message,role, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative flex  w-full text-sm')}
      {...props}
    >
         <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1  space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message}
        </MemoizedReactMarkdown>
        <ChatMessageActions content={message} />
      </div>
    </div>
  )
}
