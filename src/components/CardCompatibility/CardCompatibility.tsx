import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

interface CardCompatibilityProps {
    title: string;
}

export default function CardCompatibility({ title }: CardCompatibilityProps) {
    const theme = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                compatibility: {
                    backgroundColor: theme.colors.primary.muted,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    gap: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 18,
                },
                compatibilityIcon: {
                    width: 25,
                    height: 25,
                    borderRadius: 17,
                    backgroundColor: theme.colors.primary.main,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                compatibilityText: {
                    fontSize: 15,
                    color: theme.colors.text.primary,
                    fontWeight: '400',
                    marginRight: 20,
                },
            }),
        [theme],
    );

    return (
        <View style={styles.compatibility}>
            <View style={styles.compatibilityIcon} />

            <Text style={styles.compatibilityText}>{title}</Text>
        </View>
    );
}
