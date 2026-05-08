import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEYS = {
    onboardingDone: '@onboarding_done',
    signUpDone: '@signup_done',
    signUpDraft: '@signup_draft',
} as const;

export type SignUpDraft = {
    states: string[];
};

export async function setOnboardingDone(value: boolean):Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.onboardingDone, JSON.stringify(value));
}

export async function getOnboardingDone():Promise<boolean> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.onboardingDone);
    return value ? JSON.parse(value) : false;
}

export async function setSignUpDone(value: boolean):Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.signUpDone, JSON.stringify(value));
}

export async function getSignUpDone():Promise<boolean> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.signUpDone);
    return value ? JSON.parse(value) : false;
}

export async function setSignUpDraft(value: SignUpDraft): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.signUpDraft, JSON.stringify(value));
}

export async function getSignUpDraft(): Promise<SignUpDraft> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.signUpDraft);
    return value ? (JSON.parse(value) as SignUpDraft) : { states: [] };
}