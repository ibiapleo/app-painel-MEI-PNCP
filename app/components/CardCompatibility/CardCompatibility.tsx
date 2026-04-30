import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'iconoir-react-native';

interface CardCompatibilityProps {
    title: string;
}

export default function CardCompatibility({ title }: CardCompatibilityProps) {
    return (
        <View style={styles.compatibility}>
            <View style={styles.compatibilityIcon}>
                <Check color="#FFFFFF" width={22} height={22} />
            </View>

            <Text style={styles.compatibilityText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    compatibility: {
        backgroundColor: '#E6F1FF',
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
        height: 25 ,
        borderRadius: 17,
        backgroundColor: '#0D6EFD',
        alignItems: 'center',
        justifyContent: 'center',
    },

    compatibilityText: {
        fontSize: 15,
        color: '#202124',
        fontWeight: '400',
        marginRight: 20,
    },
});