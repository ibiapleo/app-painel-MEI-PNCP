import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { resetAuthStateForDevReload } from '@/stores/auth/devResetAuthOnReload';
import { useThemeStore } from '@/stores/theme/useThemeStore';

export default function RootLayout() {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    void resetAuthStateForDevReload();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
