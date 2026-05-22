import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE_KEY } from './constants';
import { useAuthStore } from './useAuthStore';

/** Em dev, zera auth a cada reload do bundle (signup permanece no AsyncStorage). */
export async function resetAuthStateForDevReload(): Promise<void> {
  if (!__DEV__) {
    return;
  }

  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);

  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    sessionExpiresAt: null,
    _hasHydrated: true,
  });
}
