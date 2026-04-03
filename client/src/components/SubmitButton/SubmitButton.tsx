interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  text: string;
}

export const SubmitButton = ({ loading, loadingText, text }: Readonly<SubmitButtonProps>) => {
  return (
    <button
      type="submit"
      disabled={loading}
      class="w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-2 cursor-pointer"
      style={{
        background: loading ? 'var(--color-text-muted)' : 'var(--color-primary)',
        color: 'var(--color-own-bubble-text)',
        border: 'none',
      }}
    >
      {loading ? loadingText : text}
    </button>
  );
}
