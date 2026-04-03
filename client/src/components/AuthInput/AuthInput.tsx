interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onInput: (value: string) => void;
  required?: boolean;
}

export const AuthInput = ({ id, label, type, placeholder, value, onInput, required }: Readonly<AuthInputProps>) => {
  return (
    <div>
      <label
        for={id}
        class="block text-xs font-medium mb-1.5"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onInput={(e) => onInput((e.target as HTMLInputElement).value)}
        class="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
        }}
        required={required}
      />
    </div>
  );
}
