import type { ComponentChildren } from 'preact';

interface EmptyStateProps {
  icon: ComponentChildren;
  title: string;
  subtitle: string;
}

export const EmptyState = ({ icon, title, subtitle }: Readonly<EmptyStateProps>) => {
  return (
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div
          class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{ background: 'var(--color-primary-light)' }}
        >
          {icon}
        </div>
        <p class="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
          {title}
        </p>
        <p class="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
