export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  _hasHydrated: boolean;
}

export interface ThemeActions {
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setHasHydrated: (value: boolean) => void;
}

export type ThemeStore = ThemeState & ThemeActions;
