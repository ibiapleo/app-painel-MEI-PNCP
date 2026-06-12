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
import { useTheme } from '@/hooks/useTheme';
import { getOpportunityDetail } from '@/services/opportunitiesService';
import {
    useFiltersStore,
    VALUE_RANGE_MAX,
    VALUE_RANGE_MIN,
} from '@/stores/filters/useFiltersStore';
import type { OpportunityDetail } from '@/types/opportunity';

const UF_BY_STATE: Record<string, string> = {
    'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM',
    'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF',
    'Espírito Santo': 'ES', 'Goiás': 'GO', 'Maranhão': 'MA',
    'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS', 'Minas Gerais': 'MG',
    'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR', 'Pernambuco': 'PE',
    'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN',
    'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR',
    'Santa Catarina': 'SC', 'São Paulo': 'SP', 'Sergipe': 'SE',
    'Tocantins': 'TO',
};

function formatDaysRemaining(days: number): string {
    if (days < 0) return 'Encerrado';
    if (days === 0) return 'Encerra hoje';
    if (days === 1) return '1 dia restante';
    return `${days} dias restantes`;
}


let searchTimeout: ReturnType<typeof setTimeout>;

export default function HomeScreen() {
    const theme = useTheme();
    const {
        opportunities,
        isLoading,
        error,
        toggleFavorite,
        search,
        openExternalLink
    } = useOpportunities();

    const { notificationCount } = useNotifications();

    const categories = useFiltersStore((s) => s.categories);
    const regions = useFiltersStore((s) => s.regions);
    const valueMin = useFiltersStore((s) => s.valueMin);
    const valueMax = useFiltersStore((s) => s.valueMax);

    const activeFilterCount =
        (categories.length > 0 ? 1 : 0) +
        (regions.length > 0 ? 1 : 0) +
        (valueMin > VALUE_RANGE_MIN || valueMax < VALUE_RANGE_MAX ? 1 : 0);

    const [selectedDetail, setSelectedDetail] = useState<OpportunityDetail | null>(null);
    const [isFetchingDetail, setIsFetchingDetail] = useState(false);
    const [isFilterOpen, setFilterOpen] = useState(false);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background.screen,
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
                    color: theme.error[500],
                    fontWeight: '600',
                    paddingHorizontal: 24,
                },
                emptyState: {
                    marginTop: 32,
                    textAlign: 'center',
                    color: theme.colors.text.secondary,
                    fontSize: 16,
                },
            }),
        [theme],
    );

    const filteredOpportunities = useMemo(() => {
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
                const matches = regions.some((r) => {
                    const stateLower = r.toLowerCase();
                    const uf = UF_BY_STATE[r]?.toLowerCase();
                    return loc.includes(stateLower) || (uf ? loc.includes(uf) : false);
                });
                if (!matches) return false;
            }
            if (hasCategory) {
                const haystack = `${opp.title ?? ''} ${opp.description ?? ''} ${opp.company ?? ''}`.toLowerCase();
                if (!categories.some((c) => haystack.includes(c.toLowerCase()))) return false;
            }
            return true;
        });
    }, [opportunities, categories, regions, valueMin, valueMax]);

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
                <ActivityIndicator style={styles.feedback} size="large" color={theme.colors.primary.main} />
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
