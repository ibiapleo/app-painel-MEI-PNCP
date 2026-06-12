import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';

interface CompatibilityBadgeProps {
    title: string;
}

export function CompatibilityBadge({ title }: CompatibilityBadgeProps) {
    const theme = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    backgroundColor: theme.colors.primary.muted,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    flex: 1,
                },
                iconCircle: {
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: theme.colors.primary.main,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                text: {
                    color: theme.colors.text.primary,
                    fontSize: 13,
                    fontWeight: '500',
                },
            }),
        [theme],
    );

    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={16} color={theme.colors.text.onPrimary} />
            </View>

            <Text style={styles.text}>{title}</Text>
        </View>
    );
}
