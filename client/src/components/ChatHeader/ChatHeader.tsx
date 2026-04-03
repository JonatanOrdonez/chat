import type { Room } from '../../types';

interface ChatHeaderProps {
  room: Room | null;
  onBack: () => void;
}

export const ChatHeader = ({ room, onBack }: Readonly<ChatHeaderProps>) => {
  return (
    <header
      class="shrink-0 px-6 py-3.5 flex items-center gap-4"
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <button
        onClick={onBack}
        class="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors"
        style={{
          background: 'var(--color-primary-light)',
          border: 'none',
          color: 'var(--color-primary)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div class="flex items-center gap-3">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{ background: 'var(--color-primary-light)' }}
        >
          <span class="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>
            {room?.name?.charAt(0).toUpperCase() ?? '?'}
          </span>
        </div>
        <div>
          <h1 class="text-sm font-bold" style={{ color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
            {room?.name ?? 'Cargando...'}
          </h1>
          {room && (
            <p class="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Creado por {room.created_by.userName || room.created_by.email}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
