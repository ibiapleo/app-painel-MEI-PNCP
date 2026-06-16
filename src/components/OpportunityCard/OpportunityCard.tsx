import { useMemo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { CompatibilityBadge } from '@/components/CompatibilityBadge/CompatibilityBadge';
import { useTheme } from '@/hooks/useTheme';
import type { DeadlineUrgency } from '@/utils/opportunityDeadline';

interface OpportunityCardProps {
    title: string;
    company: string;
    location: string;
    description: string;
    value: string;
    deadlineLines: string[];
    deadlineUrgency: DeadlineUrgency;
    isFavorite: boolean;
    compatibilityLabel: string;
    onToggleFavorite: () => void;
    onPress?: () => void;
}

function getDeadlineColor(
    urgency: DeadlineUrgency,
    theme: ReturnType<typeof useTheme>,
): string {
    switch (urgency) {
        case 'expired':
            return theme.colors.text.secondary;
        case 'today':
            return theme.error[500];
        case 'urgent':
            return theme.warning[500];
        default:
            return theme.colors.text.secondary;
    }
}

export function OpportunityCard({
    title,
    company,
    location,
    description,
    value,
    deadlineLines,
    deadlineUrgency,
    isFavorite,
    compatibilityLabel,
    onToggleFavorite,
    onPress,
}: OpportunityCardProps) {
    const theme = useTheme();
    const isExpired = deadlineUrgency === 'expired';
    const isMultiLine = deadlineLines.length > 1;
    const deadlineColor = getDeadlineColor(deadlineUrgency, theme);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                card: {
                    backgroundColor: theme.colors.background.surface,
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 16,
                    opacity: isExpired ? 0.75 : 1,
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
                    alignItems: 'flex-end',
                    gap: 8,
                },
                valueBlock: {
                    flex: 1,
                    minWidth: 0,
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
                    gap: 4,
                    flexShrink: 1,
                    maxWidth: '46%',
                },
                deadlineTextBlock: {
                    flexShrink: 1,
                },
                days: {
                    color: deadlineColor,
                    fontSize: isMultiLine ? 11 : 12,
                    fontWeight: deadlineUrgency === 'today' ? '700' : '500',
                    textAlign: 'right',
                    lineHeight: isMultiLine ? 14 : 18,
                },
                daysSub: {
                    fontSize: 10,
                    fontWeight: '400',
                    marginTop: 1,
                },
            }),
        [theme, isExpired, isMultiLine, deadlineColor, deadlineUrgency],
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
                <View style={styles.valueBlock}>
                    <Text style={styles.valueLabel}>VALOR ESTIMADO</Text>
                    <Text style={styles.value} numberOfLines={1}>{value}</Text>
                </View>

                <View style={styles.deadline}>
                    <Feather name="clock" size={isMultiLine ? 12 : 14} color={deadlineColor} />
                    <View style={styles.deadlineTextBlock}>
                        {deadlineLines.map((line, index) => (
                            <Text
                                key={`${line}-${index}`}
                                style={[styles.days, index > 0 && styles.daysSub]}
                                numberOfLines={1}
                            >
                                {line}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </Pressable>
    );
}
