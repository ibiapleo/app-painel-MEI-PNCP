import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';

import Button from '@/components/Button/Button';
import { usePasswordRecoveryStore } from '@/stores/auth/usePasswordRecoveryStore';
import { authService } from '@/services/authService';
import { tokens } from '@/theme';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ForgotPasswordEmailScreen() {
  const router = useRouter();
  const clearRecovery = usePasswordRecoveryStore((state) => state.clear);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearRecovery();
  }, [clearRecovery]);

  const handleContinue = async () => {
    if (!isValidEmail(email)) {
      setError('Digite um e-mail válido');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await authService.requestPasswordReset(email.trim());
      
      router.push({
        pathname: '/(auth)/forgot-password/code',
        params: { email: email.trim() },
      } as Href);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao processar solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        accessibilityLabel="Voltar"
      >
        <Feather name="arrow-left" size={24} color={tokens.colors.text.primary} />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.subtitle}>
          Informe seu e-mail para enviarmos um código de recuperação.
        </Text>

        <View style={styles.fieldGroup}>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) {
                setError('');
              }
            }}
            placeholder="Endereço de e-mail"
            placeholderTextColor={tokens.colors.text.secondary}
            autoCapitalize="none"
            keyboardType="email-address"
            selectionColor={tokens.colors.primary[500]}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <Button
          title="Continuar"
          onPress={handleContinue}
          size="lg"
          style={styles.primaryButton}
          disabled={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[50],
    paddingTop: 56,
    paddingHorizontal: tokens.spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: tokens.spacing.sm,
    marginBottom: tokens.spacing.lg,
  },
  content: {
    flex: 1,
    gap: tokens.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.heading,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: tokens.typography.fontSize.bodyM,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  fieldGroup: {
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.md,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: tokens.colors.neutral[300],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.neutral[50],
    paddingHorizontal: tokens.spacing.lg,
    fontSize: tokens.typography.fontSize.bodyM,
    color: tokens.colors.text.primary,
  },
  inputError: {
    borderColor: tokens.colors.error[500],
  },
  errorText: {
    fontSize: tokens.typography.fontSize.bodyS,
    color: tokens.colors.error[500],
  },
  primaryButton: {
    width: '100%',
    marginTop: tokens.spacing.sm,
  },
});
