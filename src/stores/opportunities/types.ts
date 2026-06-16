import type { Opportunity } from '@/types/opportunity';

export type FilterTab = 'Pra você' | 'Região' | 'Valor' | 'Prazo';
export interface OpportunitiesState {
  opportunities: Opportunity[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  activeTab: FilterTab;
}

export interface OpportunitiesActions {
  fetchOpportunities: () => Promise<void>;
  search: (query: string) => Promise<void>;
  toggleFavorite: (opportunityId: string) => Promise<void>;
  changeTab: (tab: FilterTab) => Promise<void>;
  reset: () => void;
}

export type OpportunitiesStore = OpportunitiesState & OpportunitiesActions;