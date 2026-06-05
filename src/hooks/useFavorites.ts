import { useEffect } from 'react';

import { useFavoritesStore } from '@/stores/favorites/useFavoritesStore';

export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isLoading = useFavoritesStore((state) => state.isLoading);
  const error = useFavoritesStore((state) => state.error);
  const activeTab = useFavoritesStore((state) => state.activeTab);
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const setActiveTab = useFavoritesStore((state) => state.setActiveTab);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    isLoading,
    error,
    activeTab,
    reload: fetchFavorites,
    toggleFavorite,
    setActiveTab,
  };
}
