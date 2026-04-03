import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  delay: number;
}

export const MessageBubble = ({ message, isOwn, delay }: Readonly<MessageBubbleProps>) => {
  return (
    <div
      class={`max-w-[75%] animate-slide-up ${isOwn ? 'self-end' : 'self-start'}`}
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div
        class="rounded-2xl px-4 py-2.5"
        style={{
          background: isOwn ? 'var(--color-own-bubble)' : 'var(--color-other-bubble)',
          color: isOwn ? 'var(--color-own-bubble-text)' : 'var(--color-other-bubble-text)',
          boxShadow: isOwn ? 'none' : '0 1px 3px var(--color-shadow)',
          borderBottomRightRadius: isOwn ? '6px' : '16px',
          borderBottomLeftRadius: isOwn ? '16px' : '6px',
        }}
      >
        {!isOwn && (
          <p class="text-xs font-semibold mb-1" style={{ color: 'var(--color-primary)' }}>
            {message.created_by.userName || message.created_by.email}
          </p>
        )}
        <p class="text-sm leading-relaxed">{message.content}</p>
      </div>
      <p
        class={`text-xs mt-1 px-1 ${isOwn ? 'text-right' : ''}`}
        style={{ color: 'var(--color-text-muted)' }}
      >
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
}
