import type { Opportunity } from '@/types/opportunity';

export interface OpportunitiesState {
  opportunities: Opportunity[];
  isLoading: boolean;
  error: string | null;
}

export interface OpportunitiesActions {
  fetchOpportunities: () => Promise<void>;
  toggleFavorite: (opportunityId: string) => Promise<void>;
  reset: () => void;
}

export type OpportunitiesStore = OpportunitiesState & OpportunitiesActions;
