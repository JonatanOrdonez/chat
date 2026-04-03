import type { Message } from '../../types';
import { EmptyState } from '../EmptyState/EmptyState';
import { MessageBubble } from '../MessageBubble/MessageBubble';

const ChatIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

interface MessageListProps {
  messages: Message[];
  isOwnMessage: (msg: Message) => boolean;
  messagesEndRef: preact.RefObject<HTMLDivElement>;
}

export const MessageList = ({ messages, isOwnMessage, messagesEndRef }: Readonly<MessageListProps>) => {
  if (messages.length === 0) {
    return (
      <EmptyState
        icon={<ChatIcon />}
        title="Sin mensajes"
        subtitle="Envia el primer mensaje"
      />
    );
  }

  return (
    <div class="flex flex-col gap-3 py-4">
      {messages.map((msg, i) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isOwn={isOwnMessage(msg)}
          delay={i * 20}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
