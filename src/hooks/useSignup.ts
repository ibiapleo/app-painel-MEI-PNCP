import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { authService, locationService, type LocationState } from '@/services/authService';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useSignupStore } from '@/stores/auth/useSignUpStore';

export type SignupStep = 'step1' | 'step2' | 'step3';

export function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPassword(value: string): boolean {
    if (value.length < 8) return false;
    if (!/[0-9]/.test(value)) return false;
    if (!/[A-Z]/.test(value)) return false;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return false;
    return true;
}

export function validatePassword(value: string): string | null {
    if (!value) return 'A senha é obrigatória';
    if (value.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
    if (!/[0-9]/.test(value)) return 'A senha deve conter pelo menos um número';
    if (!/[A-Z]/.test(value)) return 'A senha deve conter pelo menos uma letra maiúscula';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return 'A senha deve conter pelo menos um caractere especial';
    return null;
}

export function isValidCnpj(value: string) {
    const digits = value.replace(/\D/g, '');
    return digits.length === 14;
}

export function formatCnpj(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
}

export function useSignup(step: SignupStep) {
    const router = useRouter();
    const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);

    const {
        draft,
        errors,
        setDraftField,
        setError,
        clearError,
        toggleSelectedState,
        completeRegistration
    } = useSignupStore();

    const [states, setStates] = useState<LocationState[]>([]);
    const [loadingStates, setLoadingStates] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [loadingCnaes, setLoadingCnaes] = useState(false);

    useEffect(() => {
        if (step !== 'step2') return;

        const rawCnpj = draft.cnpj.replace(/\D/g, '');

        if (rawCnpj.length !== 14 || !isValidCnpj(draft.cnpj)) return;

        const fetchCnaes = async () => {
            setLoadingCnaes(true);
            try {
                const data = await authService.getCnaesByCnpj(rawCnpj);

                const allCnaes = [];
                if (data.primary_cnae) allCnaes.push(data.primary_cnae);
                if (data.secondary_cnaes?.length) allCnaes.push(...data.secondary_cnaes);

                setDraftField('cnaes', allCnaes);
                clearError('cnpj');
            } catch (_error) {
                setDraftField('cnaes', []);
                setError('cnpj', 'CNPJ não encontrado ou erro na busca.');
            } finally {
                setLoadingCnaes(false);
            }
        };
        fetchCnaes();
    }, [draft.cnpj, step, setDraftField, clearError, setError]);

    useEffect(() => {
        if (step !== 'step2') return;

        const rawCnpj = draft.cnpj.replace(/\D/g, '');

        if (rawCnpj.length < 14 && draft.cnaes.length > 0) {
            setDraftField('cnaes', []);
        }
    }, [draft.cnpj, draft.cnaes.length, step, setDraftField]);

    useEffect(() => {
        if (step !== 'step1') return;
        async function loadStates() {
            setLoadingStates(true);
            try {
                const data = await locationService.getStates();
                setStates(data);
            } catch (error) {
                console.error("Erro ao buscar estados do backend:", error);
            } finally {
                setLoadingStates(false);
            }
        }
        loadStates();
    }, [step]);

    const filteredStates = useMemo(() => {
        if (step !== 'step1' || !searchText.trim()) return states;
        const query = searchText.toLowerCase();
        
        return states.filter((state) => state.nome.toLowerCase().includes(query));
    }, [searchText, states, step]);

    const handleCnpjBlur = () => {
        if (draft.cnpj) {
            if (isValidCnpj(draft.cnpj)) {
                clearError('cnpj');
            } else {
                setError('cnpj', 'Digite um CNPJ válido');
            }
        }
    };

    const handleStepTwoNext = () => {
        const cnpjIsValid = isValidCnpj(draft.cnpj);

        if (!cnpjIsValid) setError('cnpj', 'Digite um CNPJ válido');

        if (!cnpjIsValid) return false;

        router.push('/(signup)/step3' as any);
        return true;
    };

    const handleEmailBlur = () => {
        if (draft.email.trim()) {
            if (isValidEmail(draft.email)) {
                clearError('email');
            } else {
                setError('email', 'Digite um email válido');
            }
        }
    };

    const handlePasswordBlur = () => {
        if (draft.password.trim()) {
            const errorMessage = validatePassword(draft.password);
            if (errorMessage) {
                setError('password', errorMessage);
            } else {
                clearError('password');
            }
        }
    };

    const handleStepThreeNext = async () => {
        if (!isValidEmail(draft.email)) {
            setError('email', 'Digite um email válido');
            return false;
        }

        const passwordError = validatePassword(draft.password);
        if (passwordError) {
            setError('password', passwordError);
            Alert.alert("Erro", passwordError);
            return false;
        }

        setIsSubmitting(true);

        try {
            const isEmailAvailable = await authService.checkEmail(draft.email);
            if (!isEmailAvailable) {
                setError('email', 'Este e-mail já está em uso.');
                setIsSubmitting(false);
                return false;
            }

            const rawCnpj = draft.cnpj.replace(/\D/g, '');

            await authService.registerMei({
                name: draft.name,
                email: draft.email,
                password: draft.password,
                cnpj: rawCnpj,
                interested_state_siglas: draft.selectedStates,
                cnae_ids: draft.cnaes.map(cnae => cnae.id),
            });

            await fetchUserProfile();
            completeRegistration();
            router.replace('/(tabs)' as Href);
            return true;
        } catch (error: any) {
            console.log("=== ERRO CAPTURADO NO TRY/CATCH ===");
            
            let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';

            if (error.response?.data?.detail) {
                const detail = error.response.data.detail;
                
                if (Array.isArray(detail)) {
                    const fieldName = detail[0].loc[detail[0].loc.length - 1]; 
                    const validationMsg = detail[0].msg;
                    
                    errorMessage = `O campo '${fieldName}' está inválido: ${validationMsg}`;
                    console.log("🚨 ERRO 422 (PYDANTIC):", JSON.stringify(detail, null, 2));
                } 
                else if (typeof detail === 'string') {
                    errorMessage = detail;
                    console.log("🚨 ERRO DA API:", detail);
                }
            } else {
                console.log("🚨 ERRO DESCONHECIDO:", error.message);
            }
            
            console.log("===================================");

            Alert.alert('Atenção', errorMessage);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step1: {
            states,
            selectedStates: draft.selectedStates,
            filteredStates,
            loadingStates,
            searchText,
            setSearchText,
            toggleState: toggleSelectedState,
            handleNext: () => router.push('/(signup)/step2' as any),
        },
        step2: {
            draft,
            errors,
            setDraftField,
            handleCnpjBlur,
            handleNext: handleStepTwoNext,
            formatCnpj,
			loadingCnaes
        },
        step3: {
            draft,
            errors,
            setDraftField,
            handleEmailBlur,
            handlePasswordBlur,
            handleNext: handleStepThreeNext,
            isSubmitting,
        },
    };
}