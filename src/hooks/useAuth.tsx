import type { User } from 'common-strategy';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type AuthContextValue = {
  user: User | null;
  pendingEmail: string;
  isAuthenticated: boolean;
  startEmailVerification: (email: string) => void;
  completeSignIn: (nextUser: User) => void;
  resetAuthFlow: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = PropsWithChildren<{
  initialUser?: User | null;
}>;

export function AuthProvider({ children, initialUser = null }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [pendingEmail, setPendingEmail] = useState('');

  const startEmailVerification = useCallback((email: string) => {
    setPendingEmail(email.trim().toLowerCase());
    setUser(null);
  }, []);

  const completeSignIn = useCallback((nextUser: User) => {
    setUser(nextUser);
    setPendingEmail('');
  }, []);

  const resetAuthFlow = useCallback(() => {
    setPendingEmail('');
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      pendingEmail,
      isAuthenticated: Boolean(user),
      startEmailVerification,
      completeSignIn,
      resetAuthFlow,
    }),
    [completeSignIn, pendingEmail, resetAuthFlow, startEmailVerification, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}


