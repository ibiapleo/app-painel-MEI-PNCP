import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {authService} from '@/services/authService';
import {AUTH_STORAGE_KEY} from './constants';
import type {AuthStore} from './types';

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            _hasHydrated: false,

            login: async (email: string, password: string) => {
                set({isLoading: true});
                try {
                    await authService.login(email, password);
                    await get().fetchUserProfile();
                } finally {
                    set({isLoading: false});
                }
            },

            fetchUserProfile: async () => {
                try {
                    const userProfile = await authService.getCurrentUser();
                    set({
                        user: userProfile,
                        isAuthenticated: true,
                    });
                } catch (error) {
                    await get().logout();
                    throw error;
                }
            },

            logout: async () => {
                set({isLoading: true});
                try {
                    await authService.logout();
                } finally {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },
            updateProfile: async (data) => {
                set({isLoading: true});
                try {
                    const updateData: {
                        name?: string;
                        cnpj?: string;
                        interested_state_siglas?: string[];
                    } = {};

                    if (data.name) {
                        updateData.name = data.name;
                    }

                    if (data.interested_state_siglas) {
                        updateData.interested_state_siglas = data.interested_state_siglas;
                    }

                    if (updateData.name || updateData.interested_state_siglas) {
                        await authService.updateProfile(updateData);
                    }

                    if (data.cnpj) {
                        await authService.updateCnpj(data.cnpj);
                    }

                    await get().fetchUserProfile();
                } finally {
                    set({isLoading: false});
                }
            },

            setHasHydrated: (value: boolean) => {
                set({_hasHydrated: value});
            },
        }),
        {
            name: AUTH_STORAGE_KEY,
            storage: createJSONStorage(() => AsyncStorage),
            skipHydration: __DEV__,
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) console.warn('Falha ao reidratar sessão:', error);

                if (state && state.isAuthenticated) {
                    state.fetchUserProfile().catch(() => {
                    });
                }
                state?.setHasHydrated(true);
            },
        },
    ),
);