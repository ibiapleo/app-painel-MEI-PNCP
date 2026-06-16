import { api } from './api';
import * as SecureStore from 'expo-secure-store';
import type { AuthUser } from '@/stores/auth/types';

export type RegisterMeiPayload = {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  interested_state_siglas: string[];
  cnae_ids: string[];
};

export type LocationState = {
  id: string;
  sigla: string;
  nome: string;
};

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token } = response.data;
    
    await SecureStore.setItemAsync('access_token', access_token);
    await SecureStore.setItemAsync('refresh_token', refresh_token);
    
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (_error) {
      // Ignora erro se já estiver deslogado
    }
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
  },

  async requestPasswordReset(email: string) {
    const response = await api.post('/auth/password-reset/request', { email });
    return response.data;
  },

  async verifyResetCode(email: string, code: string) {
    const response = await api.post('/auth/password-reset/verify', { email, code });
    return response.data;
  },

  async completePasswordReset(reset_token: string, new_password: string) {
    const response = await api.post('/auth/password-reset/complete', { reset_token, new_password });
    return response.data;
  },

  async registerMei(payload: RegisterMeiPayload) {
    const response = await api.post('/users/register', payload);
    const { access_token, refresh_token } = response.data;
    
    await SecureStore.setItemAsync('access_token', access_token);
    await SecureStore.setItemAsync('refresh_token', refresh_token);
    
    return response.data;
  },

  async checkEmail(email: string): Promise<boolean> {
    const response = await api.get('/users/check-email', {
      params: { email }
    });
    return response.data.available;
  },

  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get('/users/me');
    return response.data; 
  },

  async updateCnpj(cnpj: string) {
    const response = await api.patch('/users/me/cnpj', { cnpj });
    return response.data;
  },

  async updateProfile(data: {
    name?: string;
    interested_state_siglas?: string[];
  }) {
    const response = await api.patch('/users/me', data);
    return response.data;
  },

  async getCnaesByCnpj(cnpj: string) {
    const response = await api.get('/cnpj/cnaes', {
      params: { cnpj: cnpj.replace(/\D/g, '') },
    });
    return response.data;
  },
};

export const locationService = {
  async getStates(): Promise<LocationState[]> {
    const response = await api.get('/locations/states');
    return response.data;
  }
};