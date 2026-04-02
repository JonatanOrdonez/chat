import { useState } from 'preact/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { useAxios } from '../providers/AxiosProvider';
import { useToast } from '../providers/ToastProvider';
import type { AuthData } from '../types';

export function RegisterPage() {
  const { setAuth } = useUser();
  const axios = useAxios();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post<AuthData>('/api/auth/register', {
        email,
        password,
        userName,
      });
      setAuth(data);
      navigate('/rooms');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Error al registrarse', 'error');
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <h1
            class="text-2xl font-bold mb-1"
            style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            Crear cuenta
          </h1>
          <p class="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Unete y comienza a chatear
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} class="flex flex-col gap-3">
          <div>
            <label for="register-username" class="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              Nombre de usuario
            </label>
            <input
              id="register-username"
              type="text"
              placeholder="Tu nombre"
              value={userName}
              onInput={(e) => setUserName((e.target as HTMLInputElement).value)}
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
            <label for="register-email" class="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              Email
            </label>
            <input
              id="register-email"
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
            <label for="register-password" class="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
              Contrasena
            </label>
            <input
              id="register-password"
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
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        {/* Footer */}
        <p class="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted)' }}>
          Ya tienes cuenta?{' '}
          <Link
            to="/login"
            class="font-medium no-underline transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            Inicia sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
