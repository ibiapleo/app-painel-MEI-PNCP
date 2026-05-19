import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CompatibilityBadgeProps {
    title: string;
}

export function CompatibilityBadge({ title }: CompatibilityBadgeProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            </View>

            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5F1FF',
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
        backgroundColor: '#0877FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#202124',
        fontSize: 13,
        fontWeight: '500',
    },
});