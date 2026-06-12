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

interface CardCompatibilityProps {
    title: string;
    score?: number;
}

export default function CardCompatibility({ title, score }: CardCompatibilityProps) {
    const theme = useTheme();
    const mode = useThemeStore((state) => state.mode);
    const palette = getCompatibilityPalette(theme, title, mode, score);

    const styles = useMemo(
        () =>
            StyleSheet.create({
                compatibility: {
                    backgroundColor: palette.background,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    gap: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 18,
                },
                compatibilityIcon: {
                    width: COMPATIBILITY_ICON_SIZE,
                    height: COMPATIBILITY_ICON_SIZE,
                    borderRadius: COMPATIBILITY_ICON_SIZE / 2,
                    backgroundColor: palette.icon,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                compatibilityText: {
                    fontSize: 15,
                    color: palette.text,
                    fontWeight: '400',
                    marginRight: 20,
                },
            }),
        [palette],
    );

    return (
        <View style={styles.compatibility}>
            <View style={styles.compatibilityIcon}>
                <Ionicons
                    name={palette.iconName}
                    size={COMPATIBILITY_ICON_GLYPH_SIZE}
                    color={palette.iconForeground}
                />
            </View>

            <Text style={styles.compatibilityText}>{palette.displayLabel}</Text>
        </View>
    );
}
