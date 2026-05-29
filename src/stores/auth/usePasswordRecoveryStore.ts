import { create } from 'zustand';

interface PasswordRecoveryState {
  email: string | null;
  resetToken: string | null;
  setVerifiedCode: (email: string, resetToken: string) => void;
  clear: () => void;
}

export const usePasswordRecoveryStore = create<PasswordRecoveryState>()((set) => ({
  email: null,
  resetToken: null,

  setVerifiedCode: (email, resetToken) => {
    set({ email, resetToken });
  },

  clear: () => {
    set({ email: null, resetToken: null });
  },
}));