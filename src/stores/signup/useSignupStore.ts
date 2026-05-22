import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SignupDraft, SignupStore } from './types';

export const INITIAL_SIGNUP_DRAFT: SignupDraft = {
  selectedStates: [],
  name: '',
  cpf: '',
  cnpj: '',
  email: '',
  password: '',
};

export const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      isRegistrationComplete: false,
      draft: INITIAL_SIGNUP_DRAFT,
      _hasHydrated: false,

      setDraftField: (field, value) => {
        set((state) => ({
          draft: { ...state.draft, [field]: value },
        }));
      },

      toggleSelectedState: (stateId) => {
        set((state) => {
          const { selectedStates } = state.draft;
          const nextStates = selectedStates.includes(stateId)
            ? selectedStates.filter((id) => id !== stateId)
            : [...selectedStates, stateId];

          return {
            draft: { ...state.draft, selectedStates: nextStates },
          };
        });
      },

      completeRegistration: () => {
        set((state) => ({
          isRegistrationComplete: true,
          draft: { ...state.draft, password: '' },
        }));
      },

      setHasHydrated: (value) => {
        set({ _hasHydrated: value });
      },
    }),
    {
      name: '@licitafacil/signup',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isRegistrationComplete: state.isRegistrationComplete,
        draft: state.draft,
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('[useSignupStore] Falha ao reidratar cadastro:', error);
        }

        useSignupStore.getState().setHasHydrated(true);
      },
    },
  ),
);
