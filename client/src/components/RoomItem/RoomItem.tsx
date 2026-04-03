import type { Room } from '../../types';

const TrashIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

const QrIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3v3h-3z" />
      <path d="M21 14h-1" />
      <path d="M14 21v-1" />
      <path d="M21 21h-1v-1" />
    </svg>
  );
}

interface RoomItemProps {
  room: Room;
  index: number;
  isOwner: boolean;
  deleting: boolean;
  onClick: () => void;
  onDelete: () => void;
  onQr: () => void;
}

export const RoomItem = ({ room, index, isOwner, deleting, onClick, onDelete, onQr }: Readonly<RoomItemProps>) => {
  return (
    <button
      onClick={onClick}
      class="animate-slide-up flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer text-left transition-all"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animationDelay: `${index * 40}ms`,
        opacity: 0,
      }}
    >
      <div class="flex items-center gap-3 min-w-0">
        <div
          class="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 cursor-pointer"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          onClick={(e) => { e.stopPropagation(); onQr(); }}
        >
          <QrIcon />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
            {room.name}
          </p>
          <p class="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {room.created_by.userName || room.created_by.email}
            <span class="mx-1">·</span>
            {new Date(room.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        {isOwner && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            disabled={deleting}
            class="flex items-center justify-center w-7 h-7 rounded-lg cursor-pointer transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: deleting ? 'var(--color-text-muted)' : 'var(--color-danger)',
            }}
          >
            <TrashIcon />
          </button>
        )}
      </div>
    </button>
  );
}
