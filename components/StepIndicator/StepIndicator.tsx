import React from "react";
import { View, StyleSheet } from "react-native";
import { tokens } from "@/theme"

interface StepIndicatorProps {
    total: number,
    current: number
}

export default function StepIndicator({ total, current }:StepIndicatorProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[index === current ? styles.dotActive : styles.dot]}
                />
            ))}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: tokens.spacing.sm
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: tokens.colors.highlight
    },
    dotActive: {
        width: 10,
        height: 10,
        borderRadius: 999,
        backgroundColor: tokens.colors.primary
    }
});