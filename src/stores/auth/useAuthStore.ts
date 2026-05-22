import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AUTH_STORAGE_KEY } from './constants';
import { MOCK_SESSION_TTL_MS, selectIsSessionValid } from './session';
import type { AuthStore, AuthUser } from './types';

const MOCK_LOGIN_DELAY_MS = 1200;
const MOCK_DEFAULT_PASSWORD = '123456';
const MOCK_UPDATE_PASSWORD_DELAY_MS = 800;

const MOCK_USER: AuthUser = {
  id: 'mock-user-001',
  name: 'Usuário LicitaFácil',
  email: 'usuario@licitafacil.mock',
};

export { selectIsSessionValid } from './session';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sessionExpiresAt: null,
      mockPassword: MOCK_DEFAULT_PASSWORD,
      _hasHydrated: false,

      login: async (email: string, password: string) => {
        const { mockPassword } = useAuthStore.getState();

        if (password !== mockPassword) {
          throw new Error('INVALID_PASSWORD');
        }

        set({ isLoading: true });

        await new Promise<void>((resolve) => {
          setTimeout(resolve, MOCK_LOGIN_DELAY_MS);
        });

        const mockUser: AuthUser = {
          ...MOCK_USER,
          email: email.trim() || MOCK_USER.email,
        };

        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          sessionExpiresAt: Date.now() + MOCK_SESSION_TTL_MS,
        });
      },

      updatePassword: async (newPassword: string) => {
        set({ isLoading: true });

        await new Promise<void>((resolve) => {
          setTimeout(resolve, MOCK_UPDATE_PASSWORD_DELAY_MS);
        });

        set({
          mockPassword: newPassword,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          sessionExpiresAt: null,
        });
      },

      setHasHydrated: (value: boolean) => {
        set({ _hasHydrated: value });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      /** Em dev não reidrata sessão: o reload sempre começa deslogado. */
      skipHydration: __DEV__,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionExpiresAt: state.sessionExpiresAt,
        mockPassword: state.mockPassword,
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('[useAuthStore] Falha ao reidratar sessão:', error);
        }

        const store = useAuthStore.getState();

        if (store.isAuthenticated && !selectIsSessionValid(store)) {
          store.logout();
        }

        store.setHasHydrated(true);
      },
    },
  ),
);
