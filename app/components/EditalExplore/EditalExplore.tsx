import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'iconoir-react-native';
import CardCompatibility from "@/app/components/CardCompatibility/CardCompatibility";

interface EditalExploreProps {
    title: string;
}

export default function EditalExplore({ title }: EditalExploreProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <CardCompatibility title={"Altamente Compatível"}></CardCompatibility>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});