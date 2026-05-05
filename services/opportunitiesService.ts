import { Opportunity } from '@/types/opportunity';

const mockOpportunities: Opportunity[] = [
    {
        id: '1',
        title: 'Aquisição de coletes de identificação institucional',
        company: 'FUNDACAO NACIONAL DO INDIO',
        location: 'Recife/PE',
        description: 'Contratação de empresa para confecção e instalação de toldo.',
        estimatedValue: 50000,
        daysRemaining: 2,
        compatibilityLabel: 'Altamente Compatível',
        isFavorite: false,
    },
    {
        id: '2',
        title: 'Aquisição de conhecimento técnico e elevado',
        company: 'BARROS PAULO PAULOBARROS PAULO',
        location: 'Recife/PE',
        description:
            'Mentoria pelo mestre Paulo Barros Barros (Paulo Barros)',
        estimatedValue: 1000000000,
        daysRemaining: 2,
        compatibilityLabel: 'Extremamente Compatível',
        isFavorite: true,
    },
];

export async function toggleFavoriteOpportunity(
    opportunityId: string,
): Promise<void> {
    // Depois troca por:
    // await api.patch(`/opportunities/${opportunityId}/favorite`);

    console.log('Favoritando edital:', opportunityId);
}

export async function getRecommendedOpportunities(): Promise<Opportunity[]> {
    // Depois troca isso por:
    // const response = await api.get('/opportunities/recommended');
    // return response.data;

    return mockOpportunities;
}