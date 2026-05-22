import { create } from 'zustand';

import {
  getRecommendedOpportunities,
  toggleFavoriteOpportunity,
} from '@/services/opportunitiesService';

import type { OpportunitiesStore } from './types';

export const useOpportunitiesStore = create<OpportunitiesStore>()((set, get) => ({
  opportunities: [],
  isLoading: false,
  error: null,

  fetchOpportunities: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getRecommendedOpportunities();
      set({ opportunities: data, isLoading: false });
    } catch {
      set({
        isLoading: false,
        error: 'Não foi possível carregar os editais.',
      });
    }
  },

  toggleFavorite: async (opportunityId) => {
    const previous = get().opportunities;

    set({
      opportunities: previous.map((opportunity) =>
        opportunity.id === opportunityId
          ? { ...opportunity, isFavorite: !opportunity.isFavorite }
          : opportunity,
      ),
    });

    try {
      await toggleFavoriteOpportunity(opportunityId);
    } catch {
      set({
        opportunities: previous,
        error: 'Não foi possível atualizar o favorito.',
      });
    }
  },

  reset: () => {
    set({ opportunities: [], isLoading: false, error: null });
  },
}));
