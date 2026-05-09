import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInput, View, StyleSheet } from 'react-native';
import { tokens } from '@/theme';

interface SearchComponentProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
}

export default function SearchComponent({ 
    value = '', 
    onChangeText = () => {}, 
    placeholder = 'Buscar' 
}: SearchComponentProps) {
    return (
        <View style={styles.searchBox}>
            <Feather name="search" size={20} color={tokens.colors.text.secondary} />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={tokens.colors.text.secondary}
                value={value}
                onChangeText={onChangeText}
                style={styles.searchInput}
            />          
        </View>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        height: 42,
        backgroundColor: tokens.colors.neutral[100],
        borderRadius: tokens.radius.pill,
        paddingHorizontal: tokens.spacing.md,
        marginHorizontal: tokens.spacing.md,
        marginVertical: tokens.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontFamily: tokens.typography.fontFamily.base,
        fontSize: tokens.typography.fontSize.bodyM,
        color: tokens.colors.text.primary,
    },
});