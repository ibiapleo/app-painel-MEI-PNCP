import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { setOnboardingDone } from "@/services/localAuth";
import Button from "@/components/Button/Button";
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import OnboardingFirstSVG from '@/assets/Onboarding-1.svg';
import OnboardingSecondSVG from '@/assets/Onboarding-2.svg';
import OnboardingThirdSVG from '@/assets/Onboarding-3.svg';
import OnboardingFourthSVG from '@/assets/Onboarding-4.svg';
import { globalStyles, tokens } from '@/theme';
import { SvgProps } from "react-native-svg";
import { useRouter, type Href } from "expo-router";

type OnboardingStep = {
    id: number;
    title: string;
    subtitle: string;
    illustration: React.ComponentType<SvgProps>;
}

const onboardingSteps: readonly OnboardingStep[] = [
    {
        id: 1,
        title: 'Boas-vindas ao LicitaFácil!',
        subtitle: 'Explore editais e acompanhe oportunidades relevantes para o seu negócio!',
        illustration: OnboardingFirstSVG,
    },
    {
        id: 2,
        title: 'Encontre as melhores oportunidades!',
        subtitle: 'Filtre, salve e organize os editais que mais combinam com o perfil da sua empresa.',
        illustration: OnboardingSecondSVG
    },
    {
        id: 3,
        title: 'Não perca nenhum prazo importante!',
        subtitle: 'Ative as notificações para ser avisado sobre novidades e datas de entrega dos seus editais salvos.',
        illustration: OnboardingThirdSVG
    },
    {
        id: 4,
        title: 'Crie sua conta no LicitaFácil!',
        subtitle: 'Garanta acesso a oportunidades exclusivas para o seu negócio!',
        illustration: OnboardingFourthSVG
    }
]

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const current = onboardingSteps[currentStep];
    const isStepThree = currentStep === 2;
    const isLastStep = currentStep === onboardingSteps.length - 1;

    const handleNext = async () => {
        if (!isLastStep) {
            setCurrentStep((prev) => prev + 1);
            return;
        }
    };

    const handleGoToSignup = async () => {
        await setOnboardingDone(true);
        router.replace('/(signup)/step1' as Href);
    };

    const handleGoToLogin = () => {
        router.replace('/(auth)/login' as Href);
    };

    const Illustration = current.illustration;

    return (
        <View style={styles.screen}>
            <View style={styles.illustrationWrapper}>
                <Illustration width={280} height={280}/>
            </View>

            <View style={styles.contentWrapper}>
                {!isLastStep ? (
                    <View style={styles.stepIndicatorWrapper}>
                        <StepIndicator total={3} current={currentStep}/>
                    </View>
                ): null}

                <View style={styles.textContent}>
                    <Text style={globalStyles.title}>{current.title}</Text>
                    <Text style={globalStyles.bodyDisabled}>{current.subtitle}</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    {isLastStep ? (
                        <>
                            <Button title="Registrar" onPress={handleGoToSignup}/>
                            <Button variant="outlined" title="Entrar" onPress={handleGoToLogin}/>
                        </>
                    ) : (
                        <Button title={isStepThree ? 'Começar' : 'Próximo'} onPress={handleNext} />
                    )}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    ...globalStyles.screen,
    justifyContent: 'space-evenly',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing.md,
  },
  contentWrapper: {
    gap: tokens.spacing.xxl,
    padding: tokens.spacing.md,
  },
  stepIndicatorWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContent: {
    gap: tokens.spacing.sm,
  },
  buttonWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: tokens.spacing.lg,
  },
});