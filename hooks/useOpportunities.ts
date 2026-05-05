import { useEffect, useState } from 'react';

import {
    getRecommendedOpportunities,
    toggleFavoriteOpportunity,
} from '@/services/opportunitiesService';
import { Opportunity } from '@/types/opportunity';

export function useOpportunities() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadOpportunities() {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getRecommendedOpportunities();
            setOpportunities(data);
        } catch {
            setError('Não foi possível carregar os editais.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleToggleFavorite(opportunityId: string) {
        setOpportunities((currentOpportunities) =>
            currentOpportunities.map((opportunity) =>
                opportunity.id === opportunityId
                    ? { ...opportunity, isFavorite: !opportunity.isFavorite }
                    : opportunity,
            ),
        );

        try {
            await toggleFavoriteOpportunity(opportunityId);
        } catch {
            setOpportunities((currentOpportunities) =>
                currentOpportunities.map((opportunity) =>
                    opportunity.id === opportunityId
                        ? { ...opportunity, isFavorite: !opportunity.isFavorite }
                        : opportunity,
                ),
            );

            setError('Não foi possível atualizar o favorito.');
        }
    }

    useEffect(() => {
        loadOpportunities();
    }, []);

    return {
        opportunities,
        isLoading,
        error,
        reload: loadOpportunities,
        toggleFavorite: handleToggleFavorite,
    };
}