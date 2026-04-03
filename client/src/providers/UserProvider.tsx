import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import type { AuthData } from '../types';
import { getStoredAuth, setStoredAuth, removeStoredAuth } from '../utils/storage';

interface UserContextType {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ComponentChildren }) => {
  const [auth, setAuthState] = useState<AuthData | null>(getStoredAuth);

  const setAuth = (value: AuthData | null) => {
    if (value) {
      setStoredAuth(value);
    } else {
      removeStoredAuth();
    }
    setAuthState(value);
  };

  return (
    <UserContext.Provider value={{ auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
