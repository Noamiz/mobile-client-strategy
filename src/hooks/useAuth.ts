import { useCallback, useState } from 'react';
import type { User } from 'common-strategy';

export type AuthView = 'sendCode' | 'verifyCode' | 'loggedIn';

export function useAuth() {
  const [view, setView] = useState<AuthView>('sendCode');
  const [user, setUser] = useState<User | null>(null);

  const goToSendCode = useCallback(() => {
    setView('sendCode');
    setUser(null);
  }, []);

  const goToVerifyCode = useCallback(() => {
    setView('verifyCode');
  }, []);

  const onLoggedIn = useCallback((nextUser: User) => {
    setUser(nextUser);
    setView('loggedIn');
  }, []);

  return {
    view,
    user,
    goToSendCode,
    goToVerifyCode,
    onLoggedIn,
  };
}

