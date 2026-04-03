import { useState } from 'preact/hooks';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { useAxios } from '../providers/AxiosProvider';
import { useToast } from '../providers/ToastProvider';
import { AuthForm } from '../components/AuthForm/AuthForm';
import { AuthInput } from '../components/AuthInput/AuthInput';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';
import type { AuthData } from '../types';

const UserPlusIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

export const RegisterPage = () => {
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
      const { data } = await axios.post<AuthData>('/api/auth/register', { email, password, userName });
      setAuth(data);
      navigate('/rooms');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Error al registrarse', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      icon={<UserPlusIcon />}
      title="Crear cuenta"
      subtitle="Unete y comienza a chatear"
      footer={
        <>
          Ya tienes cuenta?{' '}
          <Link to="/login" class="font-medium no-underline" style={{ color: 'var(--color-primary)' }}>
            Inicia sesion
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} class="flex flex-col gap-3">
        <AuthInput id="register-username" label="Nombre de usuario" type="text" placeholder="Tu nombre" value={userName} onInput={setUserName} required />
        <AuthInput id="register-email" label="Email" type="email" placeholder="tu@email.com" value={email} onInput={setEmail} required />
        <AuthInput id="register-password" label="Contrasena" type="password" placeholder="••••••••" value={password} onInput={setPassword} required />
        <SubmitButton loading={loading} loadingText="Creando cuenta..." text="Registrarse" />
      </form>
    </AuthForm>
  );
}
