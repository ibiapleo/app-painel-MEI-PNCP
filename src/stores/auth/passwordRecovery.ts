import { create } from 'zustand';

interface PasswordRecoveryState {
  email: string | null;
  isCodeVerified: boolean;
  setVerifiedEmail: (email: string) => void;
  clear: () => void;
}

export const usePasswordRecoveryStore = create<PasswordRecoveryState>()((set) => ({
  email: null,
  isCodeVerified: false,

  setVerifiedEmail: (email) => {
    set({ email, isCodeVerified: true });
  },

  clear: () => {
    set({ email: null, isCodeVerified: false });
  },
}));
