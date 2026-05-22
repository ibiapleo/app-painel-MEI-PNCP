import { useEffect } from 'react';

import { useOpportunitiesStore } from '@/stores/opportunities/useOpportunitiesStore';

export function useOpportunities() {
  const opportunities = useOpportunitiesStore((state) => state.opportunities);
  const isLoading = useOpportunitiesStore((state) => state.isLoading);
  const error = useOpportunitiesStore((state) => state.error);
  const fetchOpportunities = useOpportunitiesStore(
    (state) => state.fetchOpportunities,
  );
  const toggleFavorite = useOpportunitiesStore((state) => state.toggleFavorite);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return {
    opportunities,
    isLoading,
    error,
    reload: fetchOpportunities,
    toggleFavorite,
  };
}
