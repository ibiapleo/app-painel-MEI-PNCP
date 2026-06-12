import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Cnae {
  id: string;
  title: string;
}

export interface SignupDraft {
  name: string;
  cpf: string;
  cnpj: string;
  email: string;
  password: string;
  selectedStates: string[]; // UF siglas, ex: "PE", "SP"
  cnaes: Cnae[];
}

export interface SignupErrors {
  cpf: string;
  cnpj: string;
  email: string;
}

interface SignupStoreState {
  draft: SignupDraft;
  errors: SignupErrors;
  isRegistrationComplete: boolean;
  _hasHydrated: boolean;
}

interface SignupStoreActions {
  setDraftField: <K extends keyof SignupDraft>(field: K, value: SignupDraft[K]) => void;
  setError: (field: keyof SignupErrors, error: string) => void;
  clearError: (field: keyof SignupErrors) => void;
  toggleSelectedState: (stateSigla: string) => void;
  completeRegistration: () => void;
  setHasHydrated: (value: boolean) => void;
}

type SignupStore = SignupStoreState & SignupStoreActions;

const initialDraft: SignupDraft = {
  name: '',
  cpf: '',
  cnpj: '',
  email: '',
  password: '',
  selectedStates: [],
  cnaes: [],
};

const initialErrors: SignupErrors = {
  cpf: '',
  cnpj: '',
  email: '',
};

export const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      errors: initialErrors,
      isRegistrationComplete: false,
      _hasHydrated: false,

      setDraftField: (field, value) =>
        set((state) => {
          const nextErrors = { ...state.errors };

          if (field === 'cpf') nextErrors.cpf = '';
          else if (field === 'cnpj') nextErrors.cnpj = '';
          else if (field === 'email') nextErrors.email = '';

          return {
            draft: { ...state.draft, [field]: value },
            errors: nextErrors,
          };
        }),

      setError: (field, error) =>
        set((state) => ({
          errors: { ...state.errors, [field]: error },
        })),

      clearError: (field) =>
        set((state) => ({
          errors: { ...state.errors, [field]: '' },
        })),

      toggleSelectedState: (stateSigla) =>
        set((state) => {
          const isSelected = state.draft.selectedStates.includes(stateSigla);
          return {
            draft: {
              ...state.draft,
              selectedStates: isSelected
                ? state.draft.selectedStates.filter((sigla) => sigla !== stateSigla)
                : [...state.draft.selectedStates, stateSigla],
            },
          };
        }),

      completeRegistration: () =>
        set({
          draft: initialDraft,
          errors: initialErrors,
          isRegistrationComplete: true,
        }),

      setHasHydrated: (value: boolean) =>
        set({
          _hasHydrated: value,
        }),
    }),
    {
      name: 'signup-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isRegistrationComplete: state.isRegistrationComplete,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);