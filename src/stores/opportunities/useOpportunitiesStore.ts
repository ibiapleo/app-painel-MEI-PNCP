import { Alert } from 'react-native';
import { create } from 'zustand';

import {
  getRecommendedOpportunities,
  getOpportunitiesByRegion,
  getOpportunitiesByValue,
  getOpportunitiesByTerm,
  searchOpportunities,
  toggleFavoriteOpportunity,
} from '@/services/opportunitiesService';

import type { OpportunitiesStore, FilterTab } from './types';
import type { Opportunity } from '@/types/opportunity';
import { sortOpportunitiesByDeadline } from '@/utils/opportunityDeadline';

function sortItemsForTab(items: Opportunity[], tab: FilterTab): Opportunity[] {
  if (tab === 'Pra você' || tab === 'Prazo') {
    return sortOpportunitiesByDeadline(items);
  }
  return items;
}

export const useOpportunitiesStore = create<OpportunitiesStore>()((set, get) => ({
  opportunities: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  activeTab: 'Pra você',

  fetchOpportunities: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getRecommendedOpportunities();
      set({ opportunities: sortItemsForTab(data.items, 'Pra você'), isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Não foi possível carregar os editais recomendados.',
      });
    }
  },

  search: async (query: string) => {
    try {
      set({ isLoading: true, error: null, searchQuery: query, activeTab: 'Pra você' });
      
      if (!query.trim()) {
        const data = await getRecommendedOpportunities();
        set({ opportunities: sortItemsForTab(data.items, 'Pra você'), isLoading: false });
        return;
      }

      const data = await searchOpportunities(query);
      set({ opportunities: data.items, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Erro ao pesquisar editais.',
      });
    }
  },

  changeTab: async (tab: FilterTab) => {
    if (get().activeTab === tab) return;

    set({ activeTab: tab, isLoading: true, error: null, searchQuery: '' });

    try {
      let data;
      switch (tab) {
        case 'Região':
          data = await getOpportunitiesByRegion();
          break;
        case 'Valor':
          data = await getOpportunitiesByValue();
          break;
        case 'Prazo':
          data = await getOpportunitiesByTerm();
          break;
        case 'Pra você':
        default:
          data = await getRecommendedOpportunities();
          break;
      }
      set({ opportunities: sortItemsForTab(data.items, tab), isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || `Não foi possível carregar os editais para ${tab}.`,
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
      const result = await toggleFavoriteOpportunity(opportunityId);
      set({
        opportunities: get().opportunities.map((opp) =>
          opp.id === opportunityId ? { ...opp, isFavorite: result.isFavorite } : opp
        ),
      });
    } catch {
      set({ opportunities: previous });
      
      Alert.alert(
        'Atenção',
        'Não foi possível atualizar o favorito. Tente novamente mais tarde.'
      );
    }
  },

  reset: () => {
    set({ 
      opportunities: [], 
      isLoading: false, 
      error: null, 
      searchQuery: '', 
      activeTab: 'Pra você' 
    });
  },
}));