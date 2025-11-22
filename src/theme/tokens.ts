export type ColorTokens = {
  background: string;
  surface: string;
  surfaceAlt: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  overlay: string;
};

export type SpacingScale = {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type RadiusScale = {
  sm: number;
  md: number;
  lg: number;
  pill: number;
};

export type TypographyScale = {
  title1: TypographyToken;
  title2: TypographyToken;
  body: TypographyToken;
  caption: TypographyToken;
  label: TypographyToken;
};

export type TypographyToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: '400' | '500' | '600' | '700';
};

export type ElevationToken = {
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: {
    width: number;
    height: number;
  };
  elevation: number;
};

export type ElevationScale = {
  card: ElevationToken;
  sheet: ElevationToken;
  raised: ElevationToken;
};

export type ThemeTokens = {
  colors: ColorTokens;
  spacing: SpacingScale;
  radius: RadiusScale;
  typography: TypographyScale;
  elevation: ElevationScale;
};

export const lightTheme: ThemeTokens = {
  colors: {
    background: '#f5f7fb',
    surface: '#ffffff',
    surfaceAlt: '#eef2ff',
    accent: '#2563eb',
    textPrimary: '#0f172a',
    textSecondary: '#475467',
    border: '#e2e8f0',
    success: '#16a34a',
    error: '#b42318',
    warning: '#f97316',
    overlay: 'rgba(15, 23, 42, 0.4)',
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    pill: 999,
  },
  typography: {
    title1: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
    title2: { fontSize: 22, lineHeight: 28, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
    caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
    label: { fontSize: 15, lineHeight: 20, fontWeight: '600' },
  },
  elevation: {
    card: {
      shadowColor: '#0f172a',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    sheet: {
      shadowColor: '#0f172a',
      shadowOpacity: 0.16,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: -6 },
      elevation: 10,
    },
    raised: {
      shadowColor: '#0f172a',
      shadowOpacity: 0.12,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
  },
};

export const tokens = {
  light: lightTheme,
};


