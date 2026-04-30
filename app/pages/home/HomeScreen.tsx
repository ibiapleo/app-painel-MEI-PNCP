import EditalExplore from "@/app/components/EditalExplore/EditalExplore";
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface HomeScreenProps {
}

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <EditalExplore title={""}></EditalExplore>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});