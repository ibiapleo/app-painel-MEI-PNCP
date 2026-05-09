import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Button from "@/components/Button/Button";
import SuccessSVG from '@/assets/Onboarding-4.svg';
import { globalStyles, tokens } from '@/theme';
import { useRouter, type Href } from "expo-router";

export default function SuccessScreen() {
    const router = useRouter();
    const Illustration = SuccessSVG;

    const handleNext = async () => {
        router.push("/(tabs)" as Href);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.illustrationWrapper}>
                <Illustration width={280} height={280}/>
            </View>

            <View style={styles.contentWrapper}>
                <View style={styles.textContent}>
                  <Text style={[globalStyles.title, styles.title]}>Parabéns!{"\n"}Bem-vindo ao LicitaFácil</Text>
                  <Text style={[globalStyles.bodyDisabled, styles.bodyText]}>Agora você pode acessar sua conta e começar a organizar suas licitações de forma fácil e eficiente.</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <Button title="Entrar" onPress={handleNext} />
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
    gap: tokens.spacing.xl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  bodyText: {
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: tokens.spacing.lg,
  },
});