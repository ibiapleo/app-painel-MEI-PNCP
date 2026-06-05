import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { router } from 'expo-router';

import { EditalDetailsModal } from '@/components/EditalDetailsModal/EditalDetailsModal';
import { FilterTabs } from '@/components/FilterTabs/FilterTabs';
import { OpportunityCard } from '@/components/OpportunityCard/OpportunityCard';
import { SearchHeader } from '@/components/SearchHeader/SearchHeader';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useNotifications } from '@/hooks/useNotifications';
import { getOpportunityDetail } from '@/services/opportunitiesService';
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
    
    const [selectedDetail, setSelectedDetail] = useState<OpportunityDetail | null>(null);
    const [isFetchingDetail, setIsFetchingDetail] = useState(false);

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
            />
            <FilterTabs />

            {(isLoading || isFetchingDetail) && (
                <ActivityIndicator style={styles.feedback} size="large" color="#0000ff" />
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {!isLoading && !error && opportunities.length === 0 && (
                <Text style={styles.emptyState}>Nenhum edital encontrado.</Text>
            )}

            {!isLoading && !isFetchingDetail && !error && opportunities.length > 0 && (
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {opportunities.map((opportunity) => (
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