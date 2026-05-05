import { Redirect } from 'expo-router';

export default function Index() {
  const hasSeenOnboarding = false; // lógica de aparecer o onboarding ficará pendente da autenticação na api

  if (hasSeenOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(onboarding)" />;
}