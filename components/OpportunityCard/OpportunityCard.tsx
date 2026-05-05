import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { CompatibilityBadge } from '@/components/CompatibilityBadge/CompatibilityBadge';

interface OpportunityCardProps {
    title: string;
    company: string;
    location: string;
    description: string;
    value: string;
    daysRemaining: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function OpportunityCard({
    title,
    company,
    location,
    description,
    value,
    daysRemaining,
    isFavorite,
    onToggleFavorite,
}: OpportunityCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.top}>
                <CompatibilityBadge title="Altamente Compatível" />

                <Pressable onPress={onToggleFavorite} hitSlop={10}>
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={30}
                        color={isFavorite ? '#0877FF' : '#202124'}
                    />
                </Pressable>
            </View>

            <Text style={styles.title} numberOfLines={2}>
                {title}
            </Text>

            <View style={styles.infoRow}>
                <Ionicons name="business-outline" size={15} color="#777A83" />
                <Text style={styles.infoText}>{company}</Text>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={15} color="#777A83" />
                <Text style={styles.infoText}>{location}</Text>
            </View>

            <Text style={styles.description} numberOfLines={3}>
                {description}
            </Text>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View>
                    <Text style={styles.valueLabel}>VALOR ESTIMADO</Text>
                    <Text style={styles.value}>{value}</Text>
                </View>

                <View style={styles.deadline}>
                    <Feather name="clock" size={16} color="#777A83" />
                    <Text style={styles.days}>{daysRemaining}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    title: {
        color: '#202124',
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 19,
        marginBottom: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    infoText: {
        color: '#777A83',
        fontSize: 11,
        fontWeight: '500',
    },
    description: {
        color: '#777A83',
        fontSize: 13,
        lineHeight: 17,
        marginTop: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#ECEEF2',
        marginVertical: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    valueLabel: {
        color: '#777A83',
        fontSize: 12,
        fontWeight: '600',
    },
    value: {
        color: '#202124',
        fontSize: 18,
        fontWeight: '800',
    },
    deadline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    days: {
        color: '#777A83',
        fontSize: 14,
    },
});