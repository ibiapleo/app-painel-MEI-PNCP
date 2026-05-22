import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { TextInputProps } from 'react-native';

import { fetchStates, type IBGEState } from '@/services/ibge';
import { useSignupStore } from '@/stores/signup/useSignupStore';

type SignupStep = 'step1' | 'step2' | 'step3';

export type SignupField = {
	id: string;
	label: string;
	value: string;
	placeholder: string;
	keyboardType?: TextInputProps['keyboardType'];
	secureTextEntry?: boolean;
	error?: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
};

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidCpf(value: string) {
	const digits = value.replace(/\D/g, '');
	return digits.length === 11;
}

function isValidCnpj(value: string) {
	const digits = value.replace(/\D/g, '');
	return digits.length === 14;
}

function formatCpf(value: string) {
	const digits = value.replace(/\D/g, '').slice(0, 11);
	return digits
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatCnpj(value: string) {
	const digits = value.replace(/\D/g, '').slice(0, 14);
	return digits
		.replace(/^(\d{2})(\d)/, '$1.$2')
		.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
		.replace(/\.(\d{3})(\d)/, '.$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2');
}

export function useSignup(step: SignupStep) {
	const router = useRouter();
	const draft = useSignupStore((state) => state.draft);
	const setDraftField = useSignupStore((state) => state.setDraftField);
	const toggleSelectedState = useSignupStore((state) => state.toggleSelectedState);
	const completeRegistration = useSignupStore((state) => state.completeRegistration);

	const [states, setStates] = useState<IBGEState[]>([]);
	const [loadingStates, setLoadingStates] = useState(true);
	const [searchText, setSearchText] = useState('');

	const [cpfError, setCpfError] = useState('');
	const [cnpjError, setCnpjError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [focusedField, setFocusedField] = useState<string | null>(null);

	const { selectedStates, name, cpf, cnpj, email, password } = draft;

	useEffect(() => {
		if (step !== 'step1') {
			return;
		}

		async function loadStates() {
			setLoadingStates(true);
			const data = await fetchStates();
			setStates(data);
			setLoadingStates(false);
		}

		loadStates();
	}, [step]);

	const filteredStates = useMemo(() => {
		if (step !== 'step1' || !searchText.trim()) {
			return step === 'step1' ? states : [];
		}

		const query = searchText.toLowerCase();
		return states.filter((state) => state.nome.toLowerCase().includes(query));
	}, [searchText, states, step]);

	const step2Fields = useMemo<SignupField[]>(
		() => [
			{
				id: 'name',
				label: 'Nome',
				value: name,
				placeholder: 'Seu nome',
				keyboardType: 'default',
				onChangeText: (text) => setDraftField('name', text),
			},
			{
				id: 'cpf',
				label: 'CPF',
				value: cpf,
				placeholder: '000.000.000-00',
				keyboardType: 'number-pad',
				error: cpfError,
				onChangeText: (text) => {
					setDraftField('cpf', formatCpf(text));
					setCpfError('');
				},
				onBlur: () => {
					setCpfError(isValidCpf(cpf) ? '' : 'Digite um CPF válido');
				},
			},
			{
				id: 'cnpj',
				label: 'CNPJ',
				value: cnpj,
				placeholder: 'XX.XXX.XXX/0001-XX',
				keyboardType: 'number-pad',
				error: cnpjError,
				onChangeText: (text) => {
					setDraftField('cnpj', formatCnpj(text));
					setCnpjError('');
				},
				onBlur: () => {
					setCnpjError(isValidCnpj(cnpj) ? '' : 'Digite um CNPJ válido');
				},
			},
		],
		[cpf, cpfError, cnpj, cnpjError, name, setDraftField],
	);

	const handleEmailChange = (text: string) => {
		setDraftField('email', text);
		if (emailError) {
			setEmailError('');
		}
	};

	const handleEmailBlur = () => {
		if (email.trim() && !isValidEmail(email)) {
			setEmailError('Digite um email válido');
		}
	};

	const handlePasswordChange = (text: string) => {
		setDraftField('password', text);
	};

	const handleStepOneNext = () => {
		router.push('/(signup)/step2' as any);
	};

	const handleStepTwoNext = () => {
		const cpfIsValid = isValidCpf(cpf);
		const cnpjIsValid = isValidCnpj(cnpj);

		setCpfError(cpfIsValid ? '' : 'Digite um CPF válido');
		setCnpjError(cnpjIsValid ? '' : 'Digite um CNPJ válido');

		if (!cpfIsValid || !cnpjIsValid) {
			return false;
		}

		router.push('/(signup)/step3' as any);
		return true;
	};

	const handleStepThreeNext = () => {
		if (!isValidEmail(email)) {
			setEmailError('Digite um email válido');
			return false;
		}

		setEmailError('');
		completeRegistration();
		router.push('/(signup)/success' as any);
		return true;
	};

	return {
		step1: {
			states,
			selectedStates,
			filteredStates,
			loadingStates,
			searchText,
			setSearchText,
			toggleState: toggleSelectedState,
			handleNext: handleStepOneNext,
		},
		step2: {
			fields: step2Fields,
			focusedField,
			setFocusedField,
			handleNext: handleStepTwoNext,
		},
		step3: {
			email,
			setEmail: handleEmailChange,
			emailError,
			emailBlur: handleEmailBlur,
			password,
			setPassword: handlePasswordChange,
			passwordSecureTextEntry: !showPassword,
			focusedField,
			setFocusedField,
			showPassword,
			togglePasswordVisibility: () => setShowPassword((current) => !current),
			handleNext: handleStepThreeNext,
		},
	};
}
