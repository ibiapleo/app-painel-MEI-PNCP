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
  interested_state_siglas?: string[];
  interested_states?: Array<{ sigla: string }>;
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
  updateProfile: (data: {
    name?: string;
    cnpj?: string;
    interested_state_siglas?: string[];
  }) => Promise<void>;
  setHasHydrated: (value: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;