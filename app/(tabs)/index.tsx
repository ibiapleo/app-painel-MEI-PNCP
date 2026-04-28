import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PainelScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Painel MEI</ThemedText>
          <ThemedText type="subtitle">Portal Nacional de Contratações Públicas</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold">Sobre o aplicativo</ThemedText>
          <ThemedText>
            Este aplicativo permite que Microempreendedores Individuais (MEI) consultem
            oportunidades de contratação pública disponíveis no PNCP.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold">Como usar</ThemedText>
          <ThemedText>
            Utilize a aba &quot;Buscar&quot; para pesquisar licitações e contratos disponíveis para MEI.
          </ThemedText>
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
  header: {
    gap: 8,
    marginBottom: 16,
  },
  section: {
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
});
