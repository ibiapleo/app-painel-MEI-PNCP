import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';

import Button from '@/components/Button/Button';
import { usePasswordRecoveryStore } from '@/stores/auth/passwordRecovery';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { tokens } from '@/theme';

const MIN_PASSWORD_LENGTH = 6;

export default function ForgotPasswordNewPasswordScreen() {
  const router = useRouter();
  const isCodeVerified = usePasswordRecoveryStore(
    (state) => state.isCodeVerified,
  );
  const clearRecovery = usePasswordRecoveryStore((state) => state.clear);
  const updatePassword = useAuthStore((state) => state.updatePassword);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isCodeVerified) {
      router.replace('/(auth)/forgot-password' as Href);
    }
  }, [isCodeVerified, router]);

  const handleSubmit = async () => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setError('');

    try {
      await updatePassword(password);
      clearRecovery();
      router.replace('/(auth)/login' as Href);
    } catch {
      setError('Não foi possível atualizar a senha. Tente novamente.');
    }
  };

  if (!isCodeVerified) {
    return null;
  }

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
        <Text style={styles.title}>Nova senha</Text>
        <Text style={styles.subtitle}>
          Crie uma nova senha para acessar sua conta.
        </Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Nova senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (error) {
                  setError('');
                }
              }}
              placeholder="Digite sua nova senha"
              placeholderTextColor={tokens.colors.text.secondary}
              secureTextEntry={!showPassword}
              editable={!isLoading}
              selectionColor={tokens.colors.primary[500]}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((current) => !current)}
              disabled={isLoading}
            >
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color={tokens.colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (error) {
                  setError('');
                }
              }}
              placeholder="Confirme sua nova senha"
              placeholderTextColor={tokens.colors.text.secondary}
              secureTextEntry={!showConfirmPassword}
              editable={!isLoading}
              selectionColor={tokens.colors.primary[500]}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword((current) => !current)}
              disabled={isLoading}
            >
              <Feather
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color={tokens.colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          title="Atualizar senha"
          onPress={handleSubmit}
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
  },
  label: {
    fontSize: tokens.typography.fontSize.bodyS,
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.text.label,
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
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: tokens.spacing.lg,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
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
