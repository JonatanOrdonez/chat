import type { ComponentChildren } from 'preact';

interface AuthFormProps {
  icon: ComponentChildren;
  title: string;
  subtitle: string;
  children: ComponentChildren;
  footer: ComponentChildren;
}

export const AuthForm = ({ icon, title, subtitle, children, footer }: Readonly<AuthFormProps>) => {
  return (
    <div class="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
      <div
        class="animate-fade-in w-full max-w-sm mx-4"
        style={{
          background: 'var(--color-surface)',
          borderRadius: '16px',
          boxShadow: '0 4px 24px var(--color-shadow), 0 1px 2px var(--color-shadow)',
          padding: '40px 32px',
        }}
      >
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ background: 'var(--color-primary-light)' }}
          >
            {icon}
          </div>
          <h1
            class="text-2xl font-bold mb-1"
            style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          <p class="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {subtitle}
          </p>
        </div>

        {children}

        <p class="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
          {footer}
        </p>
      </div>
    </div>
  );
}
