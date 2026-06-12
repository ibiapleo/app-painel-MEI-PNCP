import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/stores/theme/useThemeStore';
import {
    COMPATIBILITY_ICON_GLYPH_SIZE,
    COMPATIBILITY_ICON_SIZE,
    getCompatibilityPalette,
} from '@/utils/compatibility';

interface CompatibilityBadgeProps {
    title: string;
    score?: number;
}

export function CompatibilityBadge({ title, score }: CompatibilityBadgeProps) {
    const theme = useTheme();
    const mode = useThemeStore((state) => state.mode);
    const palette = getCompatibilityPalette(theme, title, mode, score);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    backgroundColor: palette.background,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    flex: 1,
                },
                iconCircle: {
                    width: COMPATIBILITY_ICON_SIZE,
                    height: COMPATIBILITY_ICON_SIZE,
                    borderRadius: COMPATIBILITY_ICON_SIZE / 2,
                    backgroundColor: palette.icon,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                text: {
                    color: palette.text,
                    fontSize: 13,
                    fontWeight: '500',
                },
            }),
        [palette],
    );

    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons
                    name={palette.iconName}
                    size={COMPATIBILITY_ICON_GLYPH_SIZE}
                    color={palette.iconForeground}
                />
            </View>

            <Text style={styles.text}>{palette.displayLabel}</Text>
        </View>
    );
}
