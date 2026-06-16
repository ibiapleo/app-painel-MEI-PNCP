export interface Opportunity {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    estimatedValue: number;
    closingDate: string;
    daysRemaining: number;
    isExpired: boolean;
    compatibilityLabel: string;
    isFavorite: boolean;
}

export interface OpportunityCategory {
    id: string;
    name: string;
    slug: string;
}

export interface OpportunityCompatibility {
    score: number;
    label: string;
    reasons: string[];
}

export interface OpportunityDetail extends Opportunity {
    pncpId: string;
    pncpUrl: string;
    agency: {
        name: string;
        cnpj: string;
        unit: string;
    };
    modality: string;
    objectFull: string;
    judgementCriterion: string;
    openingDate: string;
    closingDate: string;
    proposalsOpeningDate: string;
    categories: OpportunityCategory[];
    compatibility: OpportunityCompatibility;
    status: string;
}

export interface PaginatedOpportunities {
    items: Opportunity[];
    page: number;
    pageSize: number;
    total: number;
}