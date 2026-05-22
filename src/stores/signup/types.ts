export interface SignupDraft {
  selectedStates: string[];
  name: string;
  cpf: string;
  cnpj: string;
  email: string;
  password: string;
}

export interface SignupState {
  isRegistrationComplete: boolean;
  draft: SignupDraft;
  _hasHydrated: boolean;
}

export interface SignupActions {
  setDraftField: <K extends keyof SignupDraft>(
    field: K,
    value: SignupDraft[K],
  ) => void;
  toggleSelectedState: (stateId: string) => void;
  completeRegistration: () => void;
  setHasHydrated: (value: boolean) => void;
}

export type SignupStore = SignupState & SignupActions;
