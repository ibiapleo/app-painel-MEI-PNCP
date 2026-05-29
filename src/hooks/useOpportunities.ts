import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

import { useOpportunitiesStore } from '@/stores/opportunities/useOpportunitiesStore';

export function useOpportunities() {
  const opportunities = useOpportunitiesStore((state) => state.opportunities);
  const isLoading = useOpportunitiesStore((state) => state.isLoading);
  const error = useOpportunitiesStore((state) => state.error);
  const fetchOpportunities = useOpportunitiesStore((state) => state.fetchOpportunities);
  const toggleFavorite = useOpportunitiesStore((state) => state.toggleFavorite);
  const search = useOpportunitiesStore((state) => state.search);
  const activeTab = useOpportunitiesStore((state) => state.activeTab);
  const changeTab = useOpportunitiesStore((state) => state.changeTab);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const openExternalLink = async (url?: string) => {
    if (!url || !url.startsWith('http')) {
      Alert.alert('Ops!', 'O link original deste edital não está disponível.');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Seu dispositivo não suporta a abertura deste link.');
      }
    } catch (_error) {
      Alert.alert('Erro', 'Ocorreu um problema ao tentar abrir o navegador.');
    }
  };

  return {
    opportunities,
    isLoading,
    error,
    reload: fetchOpportunities,
    toggleFavorite,
    openExternalLink,
    search,
    activeTab,
    changeTab,
  };
}