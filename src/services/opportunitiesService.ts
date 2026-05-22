import { Opportunity } from '@/types/opportunity';

const mockOpportunities: Opportunity[] = [
    {
        id: '1',
        title: 'Aquisição de coletes de identificação institucional para atendimento das necessidades',
        company: 'FUNDACAO NACIONAL DO INDIO',
        location: 'Recife/PE',
        description: 'Contratação de empresa para confecção e instalação de toldo.',
        estimatedValue: 50000,
        daysRemaining: 2,
        compatibilityLabel: 'Altamente Compatível',
        isFavorite: false,
        simplifiedSummary:
            'Contratação de empresa para confecção e instalação de toldo na fachada correspondente à subestação e ao gerador de energia.',
        fullDescription:
            'Contratação de empresa para confecção e instalação de toldo na fachada correspondente à subestação e ao gerador de energia do imóvel da atual sede da Procuradoria Regional do Trabalho da 6ª Região, conforme condições, quantidades e especificações estabelecidas neste Aviso de Contratação Direta e seus anexos.',
        modality: 'Dispensa',
        categories: ['Manutenção', 'Climatização'],
        externalUrl: 'https://pncp.gov.br/',
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
        simplifiedSummary:
            'Mentoria especializada conduzida pelo mestre Paulo Barros para aprimoramento técnico avançado.',
        fullDescription:
            'Contratação de serviço de mentoria especializada com o mestre Paulo Barros, voltada ao aprimoramento técnico avançado em diversas áreas de conhecimento, conforme especificações deste edital.',
        modality: 'Dispensa',
        categories: ['Consultoria', 'Educação'],
        externalUrl: 'https://pncp.gov.br/',
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
