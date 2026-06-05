import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type FavoriteStatus = 'em_andamento' | 'encerrado';

interface FavoriteCardProps {
    title: string;
    company: string;
    location: string;
    value: string;
    status: FavoriteStatus;
    onPress?: () => void;
}

export function FavoriteCard({
    title,
    company,
    location,
    value,
    status,
    onPress,
}: FavoriteCardProps) {
    const isActive = status === 'em_andamento';
    const palette = isActive ? activePalette : inactivePalette;

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
                <View>
                    <Text style={[styles.valueLabel, { color: palette.textSecondary }]}>
                        VALOR ESTIMADO
                    </Text>
                    <Text style={[styles.value, { color: palette.textPrimary }]}>{value}</Text>
                </View>

                <View style={styles.statusRow}>
                    <Feather name="clock" size={14} color={palette.textSecondary} />
                    <Text style={[styles.statusText, { color: palette.textSecondary }]}>
                        {isActive ? 'Em andamento' : 'Encerrado'}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const activePalette = {
    bg: '#0877FF',
    textPrimary: '#FFFFFF',
    textSecondary: '#D7E5FA',
    divider: 'rgba(255,255,255,0.25)',
};

const inactivePalette = {
    bg: '#ECEEF2',
    textPrimary: '#202124',
    textSecondary: '#777A83',
    divider: '#D4D6DB',
};

const styles = StyleSheet.create({
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
        alignItems: 'center',
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
        gap: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '500',
    },
});
