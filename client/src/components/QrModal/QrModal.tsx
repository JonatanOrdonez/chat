import { QRCodeSVG } from 'qrcode.react';

interface QrModalProps {
  roomName: string;
  url: string;
  onClose: () => void;
}

export const QrModal = ({ roomName, url, onClose }: Readonly<QrModalProps>) => {
  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div
        class="rounded-2xl p-6 flex flex-col items-center gap-4 max-w-xs w-full mx-4"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 class="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
          {roomName}
        </h3>
        <div class="p-4 rounded-xl" style={{ background: 'white' }}>
          <QRCodeSVG value={url} size={180} />
        </div>
        <p class="text-xs text-center break-all" style={{ color: 'var(--color-text-muted)' }}>
          {url}
        </p>
        <button
          onClick={onClose}
          class="text-xs font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors"
          style={{
            color: 'var(--color-text-muted)',
            background: 'transparent',
            border: '1px solid var(--color-border)',
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
