import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { resetAuthStateForDevReload } from '@/stores/auth/devResetAuthOnReload';

export default function RootLayout() {
  useEffect(() => {
    void resetAuthStateForDevReload();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(signup)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
