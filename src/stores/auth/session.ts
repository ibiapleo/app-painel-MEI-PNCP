import type { AuthStore } from './types';

export function selectIsSessionValid(state: AuthStore): boolean {
  return state.isAuthenticated && state.user !== null;
}