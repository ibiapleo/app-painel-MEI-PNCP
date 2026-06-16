export interface AuthUser {
  name: string;
  email: string;
  cnpj?: string | null;
  company_name?: string | null;
  primary_cnae?: {
    id: string;
    description: string;
  } | null;
  secondary_cnaes?: {
    id: string;
    description: string;
  }[];
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
  setHasHydrated: (value: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;