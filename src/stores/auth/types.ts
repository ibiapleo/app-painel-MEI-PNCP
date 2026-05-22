export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Timestamp (ms) em que a sessão mock expira. */
  sessionExpiresAt: number | null;
  /** Senha mock persistida (substituída no fluxo de recuperação). */
  mockPassword: string;
  _hasHydrated: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;
