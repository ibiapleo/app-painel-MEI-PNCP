import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, tokens } from '@/theme';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.title}>Explore</Text>
      <Text style={globalStyles.subtitle}>
        Home principal do app. Aqui entram os editais recomendados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    justifyContent: 'center',
    gap: tokens.spacing.sm,
  },
});
