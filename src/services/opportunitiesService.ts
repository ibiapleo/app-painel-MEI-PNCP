import { api } from '@/services/api';
import type { OpportunityDetail, PaginatedOpportunities } from '@/types/opportunity';

export async function getRecommendedOpportunities(page = 1, pageSize = 20): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities/recommended', {
        params: { page, pageSize }
    });
    return response.data;
}

export async function searchOpportunities(searchQuery: string, page = 1, pageSize = 20): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities', {
        params: { search: searchQuery, page, pageSize }
    });
    return response.data;
}

export async function getOpportunityDetail(opportunityId: string): Promise<OpportunityDetail> {
    const response = await api.get(`/opportunities/${opportunityId}`);
    return response.data;
}

export async function toggleFavoriteOpportunity(opportunityId: string): Promise<{ id: string; isFavorite: boolean }> {
    const response = await api.patch(`/opportunities/${opportunityId}/favorite`);
    return response.data;
}

export async function getOpportunitiesByRegion(page = 1, pageSize = 20): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities/region', { params: { page, pageSize } });
    return response.data;
}

export async function getOpportunitiesByValue(page = 1, pageSize = 20): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities/value', { params: { page, pageSize } });
    return response.data;
}

export async function getOpportunitiesByTerm(page = 1, pageSize = 20): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities/term', { params: { page, pageSize } });
    return response.data;
}

export async function getFavoriteOpportunities(page = 1, pageSize = 50): Promise<PaginatedOpportunities> {
    const response = await api.get('/opportunities/favorites/list', { params: { page, pageSize } });
    return response.data;
}