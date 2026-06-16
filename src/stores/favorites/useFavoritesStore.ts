import { Alert } from 'react-native';
import { create } from 'zustand';

import {
  getFavoriteOpportunities,
  toggleFavoriteOpportunity,
} from '@/services/opportunitiesService';

import type { FavoritesStore } from './types';

export const useFavoritesStore = create<FavoritesStore>()((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,
  activeTab: 'Em andamento',

  fetchFavorites: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getFavoriteOpportunities();
      set({ favorites: data.items, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Não foi possível carregar seus favoritos.',
      });
    }
  },

  toggleFavorite: async (opportunityId) => {
    const previous = get().favorites;
    const target = previous.find((o) => o.id === opportunityId);
    if (!target) return;

    set({ favorites: previous.filter((o) => o.id !== opportunityId) });

    try {
      const result = await toggleFavoriteOpportunity(opportunityId);
      if (result.isFavorite) {
        set({ favorites: [...get().favorites, target] });
      }
    } catch {
      set({ favorites: previous });
      Alert.alert(
        'Atenção',
        'Não foi possível atualizar o favorito. Tente novamente mais tarde.'
      );
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  reset: () =>
    set({ favorites: [], isLoading: false, error: null, activeTab: 'Em andamento' }),
}));
