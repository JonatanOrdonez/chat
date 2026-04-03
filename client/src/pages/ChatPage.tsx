import { useEffect, useRef } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { useChat } from '../providers/ChatProvider';
import { ChatHeader } from '../components/ChatHeader/ChatHeader';
import { ChatInput } from '../components/ChatInput/ChatInput';
import { MessageList } from '../components/MessageList/MessageList';
import type { Message } from '../types';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { auth } = useUser();
  const { messages, loading, room, sending, sendMessage } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isOwnMessage = (message: Message) =>
    message.created_by.email === auth?.user.email;

  return (
    <div class="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <ChatHeader room={room} onBack={() => navigate('/rooms')} />

      <div class="flex-1 overflow-y-auto px-6 min-h-0">
        <div class="max-w-3xl mx-auto w-full flex flex-col" style={{ minHeight: '100%' }}>
          {loading ? (
            <div class="flex-1 flex items-center justify-center">
              <p class="text-sm" style={{ color: 'var(--color-text-muted)' }}>Cargando mensajes...</p>
            </div>
          ) : (
            <MessageList messages={messages} isOwnMessage={isOwnMessage} messagesEndRef={messagesEndRef} />
          )}
        </div>
      </div>

      <ChatInput sending={sending} onSend={sendMessage} />
    </div>
  );
}
