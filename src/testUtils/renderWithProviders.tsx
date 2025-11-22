import type { User } from 'common-strategy';
import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SnackbarProvider } from '../components/snackbar/SnackbarProvider';
import { AuthProvider } from '../hooks/useAuth';
import { ThemeProvider } from '../theme';

type Options = {
  withNavigation?: boolean;
  initialUser?: User | null;
};

export function renderWithProviders(ui: ReactElement, options?: Options) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider initialUser={options?.initialUser}>
          <SnackbarProvider>
            {options?.withNavigation ? <NavigationContainer>{children}</NavigationContainer> : children}
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );

  return render(ui, { wrapper: Wrapper });
}


