import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { Snackbar, type SnackbarVariant } from './Snackbar';

type SnackbarContextValue = {
  showSnackbar: (message: string, options?: { variant?: SnackbarVariant; duration?: number }) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

type SnackbarState = {
  message: string;
  variant: SnackbarVariant;
  duration: number;
  visible: boolean;
};

const initialState: SnackbarState = {
  message: '',
  variant: 'info',
  duration: 3500,
  visible: false,
};

export function SnackbarProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<SnackbarState>(initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hide = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  const showSnackbar = useCallback(
    (message: string, options?: { variant?: SnackbarVariant; duration?: number }) => {
      setState({
        message,
        variant: options?.variant ?? 'info',
        duration: options?.duration ?? 3500,
        visible: true,
      });
    },
    [],
  );

  useEffect(() => {
    if (state.visible) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        hide();
      }, state.duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [hide, state.duration, state.visible]);

  const value = useMemo<SnackbarContextValue>(
    () => ({
      showSnackbar,
    }),
    [showSnackbar],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar visible={state.visible} message={state.message} variant={state.variant} />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
}


