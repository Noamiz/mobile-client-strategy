import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { lightTheme, type ThemeTokens } from './tokens';

const ThemeContext = createContext<ThemeTokens>(lightTheme);

export function ThemeProvider({ children }: PropsWithChildren) {
  return <ThemeContext.Provider value={lightTheme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styleFactory: (theme: ThemeTokens) => T,
) {
  return function useThemedStyles() {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(styleFactory(theme)), [styleFactory, theme]);
  };
}

export type { ThemeTokens };


