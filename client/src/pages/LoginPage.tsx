import { useState } from 'preact/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { useAxios } from '../providers/AxiosProvider';
import { useToast } from '../providers/ToastProvider';
import type { AuthData } from '../types';

export function LoginPage() {
  const { setAuth } = useUser();
  const axios = useAxios();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post<AuthData>('/api/auth/login', { email, password });
      setAuth(data);
      navigate('/rooms');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Error al iniciar sesion', 'error');
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
            style={{ background: 'var(--color-primary-light)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h1
            class="text-2xl font-bold mb-1"
            style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            Bienvenido
          </h1>
          <p class="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Inicia sesion para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} class="flex flex-col gap-3">
          <div>
            <label for="login-email" class="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
              class="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
              required
            />
          </div>

          <div>
            <label for="login-password" class="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              Contrasena
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              class="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
              }}
              required
            />
          </div>

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
            {loading ? 'Entrando...' : 'Iniciar sesion'}
          </button>
        </form>

        {/* Footer */}
        <p class="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
          No tienes cuenta?{' '}
          <Link
            to="/register"
            class="font-medium no-underline transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
