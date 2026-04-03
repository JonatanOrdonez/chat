interface RoomFormProps {
  value: string;
  creating: boolean;
  onInput: (value: string) => void;
  onSubmit: () => void;
}

export const RoomForm = ({ value, creating, onInput, onSubmit }: Readonly<RoomFormProps>) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} class="flex gap-2 mb-8">
      <input
        type="text"
        placeholder="Nombre del nuevo room..."
        value={value}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
        class="flex-1 px-3.5 py-2.5 rounded-lg text-sm"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
        }}
      />
      <button
        type="submit"
        disabled={creating}
        class="px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all"
        style={{
          background: creating ? 'var(--color-text-muted)' : 'var(--color-primary)',
          color: 'white',
          border: 'none',
        }}
      >
        {creating ? '...' : 'Crear'}
      </button>
    </form>
  );
}
