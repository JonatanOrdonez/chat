import { useState } from 'preact/hooks';
import type { Room } from '../../types';
import { EmptyState } from '../EmptyState/EmptyState';
import { RoomItem } from '../RoomItem/RoomItem';
import { QrModal } from '../QrModal/QrModal';

const ChatIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

interface RoomListProps {
  rooms: Room[];
  loading: boolean;
  deleting: string | null;
  isOwner: (room: Room) => boolean;
  onRoomClick: (roomId: string) => void;
  onDelete: (roomId: string) => void;
}

export const RoomList = ({ rooms, loading, deleting, isOwner, onRoomClick, onDelete }: Readonly<RoomListProps>) => {
  const [qrRoom, setQrRoom] = useState<Room | null>(null);

  const getRoomUrl = (roomId: string) =>
    `${window.location.origin}/rooms/${roomId}`;

  if (loading) {
    return (
      <div class="text-center py-16">
        <p class="text-sm" style={{ color: 'var(--color-text-muted)' }}>Cargando rooms...</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div class="text-center py-16">
        <EmptyState
          icon={<ChatIcon />}
          title="No hay rooms todavia"
          subtitle="Crea el primero para empezar a chatear"
        />
      </div>
    );
  }

  return (
    <>
      <div class="flex flex-col gap-2">
        {rooms.map((room, i) => (
          <RoomItem
            key={room.id}
            room={room}
            index={i}
            isOwner={isOwner(room)}
            deleting={deleting === room.id}
            onClick={() => onRoomClick(room.id)}
            onDelete={() => onDelete(room.id)}
            onQr={() => setQrRoom(room)}
          />
        ))}
      </div>
      {qrRoom && (
        <QrModal
          roomName={qrRoom.name}
          url={getRoomUrl(qrRoom.id)}
          onClose={() => setQrRoom(null)}
        />
      )}
    </>
  );
}
