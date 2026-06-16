import { memo, useMemo } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/hooks/useTheme';

export type FavoriteStatus = 'em_andamento' | 'encerrado';

interface FavoriteCardProps {
    title: string;
    company: string;
    location: string;
    value: string;
    status: FavoriteStatus;
    deadlineLines: string[];
    onPress?: () => void;
}

function getPalette(theme: AppTheme, isActive: boolean) {
    if (isActive) {
        return {
            bg: theme.colors.primary.main,
            textPrimary: theme.colors.text.onPrimary,
            textSecondary: 'rgba(255,255,255,0.75)',
            divider: 'rgba(255,255,255,0.25)',
        };
    }

    return {
        bg: theme.colors.border.default,
        textPrimary: theme.colors.text.primary,
        textSecondary: theme.colors.text.secondary,
        divider: theme.colors.border.subtle,
    };
}

function FavoriteCardImpl({
    title,
    company,
    location,
    value,
    status,
    deadlineLines,
    onPress,
}: FavoriteCardProps) {
    const theme = useTheme();
    const isActive = status === 'em_andamento';
    const isMultiLine = deadlineLines.length > 1;
    const palette = getPalette(theme, isActive);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                card: {
                    borderRadius: 16,
                    padding: 16,
                    marginHorizontal: 24,
                    marginBottom: 12,
                },
                pressed: {
                    opacity: 0.85,
                },
                title: {
                    fontSize: 15,
                    fontWeight: '700',
                    lineHeight: 19,
                    marginBottom: 10,
                },
                infoRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 2,
                },
                infoText: {
                    fontSize: 11,
                    fontWeight: '500',
                },
                divider: {
                    height: 1,
                    marginVertical: 12,
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
                    fontSize: 11,
                    fontWeight: '600',
                },
                value: {
                    fontSize: 18,
                    fontWeight: '800',
                },
                statusRow: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    flexShrink: 1,
                    maxWidth: '46%',
                },
                statusTextBlock: {
                    flexShrink: 1,
                },
                statusText: {
                    fontSize: isMultiLine ? 11 : 12,
                    fontWeight: '500',
                    textAlign: 'right',
                    lineHeight: isMultiLine ? 14 : 18,
                },
                statusTextSub: {
                    fontSize: 10,
                    fontWeight: '400',
                    marginTop: 1,
                },
            }),
        [isMultiLine],
    );

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: palette.bg },
                pressed && onPress ? styles.pressed : null,
            ]}
        >
            <Text style={[styles.title, { color: palette.textPrimary }]} numberOfLines={2}>
                {title}
            </Text>

            <View style={styles.infoRow}>
                <Ionicons name="business-outline" size={14} color={palette.textSecondary} />
                <Text style={[styles.infoText, { color: palette.textSecondary }]} numberOfLines={1}>
                    {company}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color={palette.textSecondary} />
                <Text style={[styles.infoText, { color: palette.textSecondary }]} numberOfLines={1}>
                    {location}
                </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: palette.divider }]} />

            <View style={styles.footer}>
                <View style={styles.valueBlock}>
                    <Text style={[styles.valueLabel, { color: palette.textSecondary }]}>
                        VALOR ESTIMADO
                    </Text>
                    <Text style={[styles.value, { color: palette.textPrimary }]} numberOfLines={1}>
                        {value}
                    </Text>
                </View>

                <View style={styles.statusRow}>
                    <Feather name="clock" size={isMultiLine ? 12 : 14} color={palette.textSecondary} />
                    <View style={styles.statusTextBlock}>
                        {deadlineLines.map((line, index) => (
                            <Text
                                key={`${line}-${index}`}
                                style={[
                                    styles.statusText,
                                    index > 0 && styles.statusTextSub,
                                    { color: palette.textSecondary },
                                ]}
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

export const FavoriteCard = memo(FavoriteCardImpl);
