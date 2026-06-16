import { useThemeStore } from '@/stores/theme/useThemeStore';
import { lightTheme, themes, type AppTheme } from '@/theme/themes';

export { lightTheme };
export type { AppTheme };

export function useTheme(): AppTheme {
  const mode = useThemeStore((state) => state.mode);
  return themes[mode];
}
