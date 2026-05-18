import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FilterTabs } from '@/components/FilterTabs/FilterTabs';
import { OpportunityCard } from '@/components/OpportunityCard/OpportunityCard';
import { SearchHeader } from '@/components/SearchHeader/SearchHeader';
import { useOpportunities } from '@/hooks/useOpportunities';
import {useNotifications} from "@/hooks/useNotifications";

export default function HomeScreen() {
    const { opportunities, isLoading, error, toggleFavorite } = useOpportunities();
    const { notificationCount } = useNotifications();

    return (
        <View style={styles.container}>
            <SearchHeader notificationCount={notificationCount} />
            <FilterTabs />

            {isLoading && <ActivityIndicator style={styles.feedback} />}

            {error && <Text style={styles.error}>{error}</Text>}

            {!isLoading && !error && (
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
                            value={opportunity.estimatedValue.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                            daysRemaining={`${opportunity.daysRemaining} dias restantes`}
                            isFavorite={opportunity.isFavorite}
                            onToggleFavorite={() => toggleFavorite(opportunity.id)}
                        />
                    ))}
                </ScrollView>
            )}
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
    },
});