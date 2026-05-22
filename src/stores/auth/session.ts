import type { AuthStore } from './types';

/** TTL mock da sessão (7 dias). Substituir pelo `exp` do JWT quando houver API. */
export const MOCK_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function selectIsSessionValid(state: AuthStore): boolean {
  if (!state.isAuthenticated || !state.user) {
    return false;
  }

  if (state.sessionExpiresAt === null) {
    return false;
  }

  return Date.now() < state.sessionExpiresAt;
}
