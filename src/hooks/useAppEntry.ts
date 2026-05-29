import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useSignupStore } from '@/stores/auth/useSignUpStore';

export type AppEntryRoute = '/(onboarding)' | '/(auth)/login' | '/(tabs)';

export function useAppEntry(): {
  route: AppEntryRoute | null;
  isReady: boolean;
} {
  const authHydrated = useAuthStore((state) => state._hasHydrated);
  const signupHydrated = useSignupStore((state) => state._hasHydrated);
  
  const isRegistrationComplete = useSignupStore(
    (state) => state.isRegistrationComplete,
  );
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!authHydrated || !signupHydrated) {
    return { route: null, isReady: false };
  }

  if (!isRegistrationComplete) {
    return { route: '/(onboarding)', isReady: true };
  }

  if (isAuthenticated) {
    return { route: '/(tabs)', isReady: true };
  }

  return { route: '/(auth)/login', isReady: true };
}