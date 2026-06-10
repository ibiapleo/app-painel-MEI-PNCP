import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { router } from 'expo-router';

import { EditalDetailsModal } from '@/components/EditalDetailsModal/EditalDetailsModal';
import { FilterModal } from '@/components/FilterModal/FilterModal';
import { FilterTabs } from '@/components/FilterTabs/FilterTabs';
import { OpportunityCard } from '@/components/OpportunityCard/OpportunityCard';
import { SearchHeader } from '@/components/SearchHeader/SearchHeader';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useNotifications } from '@/hooks/useNotifications';
import { getOpportunityDetail } from '@/services/opportunitiesService';
import {
    countActiveFilters,
    useFiltersStore,
    VALUE_RANGE_MAX,
    VALUE_RANGE_MIN,
} from '@/stores/filters/useFiltersStore';
import type { OpportunityDetail } from '@/types/opportunity';

function formatDaysRemaining(days: number): string {
    if (days < 0) return 'Encerrado';
    if (days === 0) return 'Encerra hoje';
    if (days === 1) return '1 dia restante';
    return `${days} dias restantes`;
}


let searchTimeout: ReturnType<typeof setTimeout>;

export default function HomeScreen() {
    const {
        opportunities,
        isLoading,
        error,
        toggleFavorite,
        search,
        openExternalLink
    } = useOpportunities();

    const { notificationCount } = useNotifications();
    const filters = useFiltersStore();
    const activeFilterCount = countActiveFilters(filters);

    const [selectedDetail, setSelectedDetail] = useState<OpportunityDetail | null>(null);
    const [isFetchingDetail, setIsFetchingDetail] = useState(false);
    const [isFilterOpen, setFilterOpen] = useState(false);

    const filteredOpportunities = useMemo(() => {
        const { categories, regions, valueMin, valueMax } = filters;
        const hasCategory = categories.length > 0;
        const hasRegion = regions.length > 0;
        const hasValue = valueMin > VALUE_RANGE_MIN || valueMax < VALUE_RANGE_MAX;
        if (!hasCategory && !hasRegion && !hasValue) return opportunities;

        return opportunities.filter((opp) => {
            if (hasValue) {
                const v = Number(opp.estimatedValue ?? 0);
                if (v < valueMin || v > valueMax) return false;
            }
            if (hasRegion) {
                const loc = (opp.location ?? '').toLowerCase();
                if (!regions.some((r) => loc.includes(r.toLowerCase()))) return false;
            }
            if (hasCategory) {
                const haystack = `${opp.title} ${opp.description}`.toLowerCase();
                if (!categories.some((c) => haystack.includes(c.toLowerCase()))) return false;
            }
            return true;
        });
    }, [opportunities, filters]);

    const handleSearch = (text: string) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (search) search(text);
        }, 500);
    };

    const handleOpenDetails = async (id: string) => {
        try {
            setIsFetchingDetail(true);
            const detail = await getOpportunityDetail(id);
            setSelectedDetail(detail);
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível carregar os detalhes do edital.');
        } finally {
            setIsFetchingDetail(false);
        }
    };

    return (
        <View style={styles.container}>
            <SearchHeader
                notificationCount={notificationCount}
                onSearch={handleSearch}
                onPressFavorites={() => router.push('/(tabs)/painel')}
                onPressFilters={() => setFilterOpen(true)}
                activeFilterCount={activeFilterCount}
            />
            <FilterTabs />

            {(isLoading || isFetchingDetail) && (
                <ActivityIndicator style={styles.feedback} size="large" color="#0000ff" />
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {!isLoading && !error && filteredOpportunities.length === 0 && (
                <Text style={styles.emptyState}>
                    {opportunities.length === 0
                        ? 'Nenhum edital encontrado.'
                        : 'Nenhum edital corresponde aos filtros aplicados.'}
                </Text>
            )}

            {!isLoading && !isFetchingDetail && !error && filteredOpportunities.length > 0 && (
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredOpportunities.map((opportunity) => (
                        <OpportunityCard
                            key={opportunity.id}
                            title={opportunity.title}
                            company={opportunity.company}
                            location={opportunity.location}
                            description={opportunity.description}
                            value={Number(opportunity.estimatedValue).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                            daysRemaining={formatDaysRemaining(opportunity.daysRemaining)}
                            isFavorite={opportunity.isFavorite}
                            compatibilityLabel={opportunity.compatibilityLabel}
                            onToggleFavorite={() => toggleFavorite(opportunity.id)}
                            onPress={() => handleOpenDetails(opportunity.id)}
                        />
                    ))}
                </ScrollView>
            )}

            <EditalDetailsModal
                visible={!!selectedDetail}
                opportunity={selectedDetail}
                onClose={() => setSelectedDetail(null)}
                onToggleFavorite={toggleFavorite}
                onFollow={(id) => {
                    console.log('Acompanhar edital:', id);
                }}
                onOpenExternal={(id) => {
                    openExternalLink(selectedDetail?.pncpUrl || id);
                }}
            />

            <FilterModal visible={isFilterOpen} onClose={() => setFilterOpen(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },
    feedback: {
        marginTop: 32,
    },
    error: {
        marginTop: 32,
        textAlign: 'center',
        color: '#D92D20',
        fontWeight: '600',
        paddingHorizontal: 24,
    },
    emptyState: {
        marginTop: 32,
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
    }
});
