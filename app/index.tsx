import { Redirect } from 'expo-router';

export default function Index() {
  const hasSeenOnboarding = false;

  if (hasSeenOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(onboarding)" />;
}