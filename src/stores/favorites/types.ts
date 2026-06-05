import type { Opportunity } from '@/types/opportunity';

export type FavoritesTab = 'Em andamento' | 'Encerrados';

export interface FavoritesState {
  favorites: Opportunity[];
  isLoading: boolean;
  error: string | null;
  activeTab: FavoritesTab;
}

export interface FavoritesActions {
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (opportunityId: string) => Promise<void>;
  setActiveTab: (tab: FavoritesTab) => void;
  reset: () => void;
}

export type FavoritesStore = FavoritesState & FavoritesActions;
