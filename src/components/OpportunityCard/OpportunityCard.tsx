import { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { CompatibilityBadge } from '@/components/CompatibilityBadge/CompatibilityBadge';
import { useTheme } from '@/hooks/useTheme';

interface OpportunityCardProps {
    title: string;
    company: string;
    location: string;
    description: string;
    value: string;
    daysRemaining: string;
    isFavorite: boolean;
    compatibilityLabel: string;
    onToggleFavorite: () => void;
    onPress?: () => void;
}

export function OpportunityCard({
    title,
    company,
    location,
    description,
    value,
    daysRemaining,
    isFavorite,
    compatibilityLabel,
    onToggleFavorite,
    onPress,
}: OpportunityCardProps) {
    const theme = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                card: {
                    backgroundColor: theme.colors.background.surface,
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 16,
                },
                cardPressed: {
                    opacity: 0.85,
                },
                top: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 16,
                },
                title: {
                    color: theme.colors.text.primary,
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
                    color: theme.colors.text.secondary,
                    fontSize: 11,
                    fontWeight: '500',
                },
                description: {
                    color: theme.colors.text.secondary,
                    fontSize: 13,
                    lineHeight: 17,
                    marginTop: 14,
                },
                divider: {
                    height: 1,
                    backgroundColor: theme.colors.border.subtle,
                    marginVertical: 14,
                },
                footer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                valueLabel: {
                    color: theme.colors.text.secondary,
                    fontSize: 12,
                    fontWeight: '600',
                },
                value: {
                    color: theme.colors.text.primary,
                    fontSize: 18,
                    fontWeight: '800',
                },
                deadline: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                },
                days: {
                    color: theme.colors.text.secondary,
                    fontSize: 14,
                },
            }),
        [theme],
    );

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.card, pressed && onPress ? styles.cardPressed : null]}
        >
            <View style={styles.top}>
                <CompatibilityBadge title={compatibilityLabel} />

                <Pressable onPress={onToggleFavorite} hitSlop={10}>
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={30}
                        color={isFavorite ? theme.colors.primary.main : theme.colors.text.primary}
                    />
                </Pressable>
            </View>

            <Text style={styles.title} numberOfLines={2}>
                {title}
            </Text>

            <View style={styles.infoRow}>
                <Ionicons name="business-outline" size={15} color={theme.colors.text.secondary} />
                <Text style={styles.infoText}>{company}</Text>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={15} color={theme.colors.text.secondary} />
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
                    <Feather name="clock" size={16} color={theme.colors.text.secondary} />
                    <Text style={styles.days}>{daysRemaining}</Text>
                </View>
            </View>
        </Pressable>
    );
}
