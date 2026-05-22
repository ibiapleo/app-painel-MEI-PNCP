export interface Opportunity {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    estimatedValue: number;
    daysRemaining: number;
    compatibilityLabel: string;
    isFavorite: boolean;
    simplifiedSummary: string;
    fullDescription: string;
    modality: string;
    categories: string[];
    externalUrl?: string;
}
