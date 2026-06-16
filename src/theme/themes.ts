import { tokens } from './tokens';

const shared = {
  primary: tokens.colors.primary,
  success: tokens.colors.success,
  warning: tokens.colors.warning,
  error: tokens.colors.error,
  spacing: tokens.spacing,
  radius: tokens.radius,
  typography: tokens.typography,
};

export const lightTheme = {
  ...shared,
  isDark: false,
  colors: {
    background: {
      screen: '#F5F6FA',
      surface: tokens.colors.neutral[50],
      elevated: tokens.colors.neutral[50],
      muted: tokens.colors.neutral[100],
    },
    text: {
      heading: tokens.colors.text.heading,
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
      label: tokens.colors.text.label,
      onPrimary: tokens.colors.text.onPrimary,
    },
    border: {
      default: tokens.colors.neutral[300],
      subtle: tokens.colors.neutral[200],
    },
    primary: {
      main: tokens.colors.primary[500],
      muted: tokens.colors.primary[50],
    },
    tabBar: {
      background: '#FFFFFF',
      border: '#F0F1F4',
      active: tokens.colors.primary[500],
      inactive: '#C4C7CF',
    },
  },
} as const;

export const darkTheme = {
  ...shared,
  isDark: true,
  colors: {
    background: {
      screen: '#121318',
      surface: tokens.colors.neutral[800],
      elevated: tokens.colors.neutral[900],
      muted: '#1A1B20',
    },
    text: {
      heading: '#FFFFFF',
      primary: tokens.colors.neutral[100],
      secondary: tokens.colors.neutral[400],
      label: tokens.colors.neutral[300],
      onPrimary: '#FFFFFF',
    },
    border: {
      default: tokens.colors.neutral[700],
      subtle: '#3A3B40',
    },
    primary: {
      main: tokens.colors.primary[300],
      muted: '#1A2D4A',
    },
    tabBar: {
      background: tokens.colors.neutral[900],
      border: tokens.colors.neutral[800],
      active: tokens.colors.primary[300],
      inactive: tokens.colors.neutral[400],
    },
  },
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type AppTheme = typeof lightTheme | typeof darkTheme;
