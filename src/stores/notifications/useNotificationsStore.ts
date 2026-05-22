import { create } from 'zustand';

import type { NotificationsStore } from './types';

const MOCK_NOTIFICATION_COUNT = 9;
const MOCK_FETCH_DELAY_MS = 300;

export const useNotificationsStore = create<NotificationsStore>()((set) => ({
  count: 0,
  isLoading: false,
  error: null,

  fetchCount: async () => {
    try {
      set({ isLoading: true, error: null });

      await new Promise<void>((resolve) => {
        setTimeout(resolve, MOCK_FETCH_DELAY_MS);
      });

      // Substituir por chamada à API quando disponível.
      set({ count: MOCK_NOTIFICATION_COUNT, isLoading: false });
    } catch {
      set({
        isLoading: false,
        error: 'Não foi possível carregar as notificações.',
      });
    }
  },

  reset: () => {
    set({ count: 0, isLoading: false, error: null });
  },
}));
