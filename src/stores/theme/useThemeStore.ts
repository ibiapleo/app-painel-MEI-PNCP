import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_STORAGE_KEY } from './constants';
import type { ThemeStore } from './types';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: 'light',
      _hasHydrated: false,

      setMode: (mode) => {
        set({ mode });
      },

      toggleMode: () => {
        set({ mode: get().mode === 'light' ? 'dark' : 'light' });
      },

      setHasHydrated: (value: boolean) => {
        set({ _hasHydrated: value });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mode: state.mode,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.warn('Falha ao reidratar tema:', error);
        state?.setHasHydrated(true);
      },
    },
  ),
);
