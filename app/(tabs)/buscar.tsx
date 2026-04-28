import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BuscarScreen() {
  const colorScheme = useColorScheme();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // TODO: Integrar com a API do PNCP
    console.log('Buscando:', query);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Buscar Licitações</ThemedText>
        <ThemedText>Pesquise por oportunidades de contratação para MEI no PNCP.</ThemedText>

        <ThemedView style={styles.searchRow}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: Colors[colorScheme ?? 'light'].tint,
                color: Colors[colorScheme ?? 'light'].text,
              },
            ]}
            placeholder="Ex: serviços de limpeza..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleSearch}>
            <ThemedText style={styles.buttonText}>Buscar</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.placeholder}>
          <ThemedText type="defaultSemiBold">Nenhuma busca realizada.</ThemedText>
          <ThemedText>Os resultados aparecerão aqui.</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    gap: 16,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  placeholder: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
    padding: 24,
    borderRadius: 12,
  },
});
