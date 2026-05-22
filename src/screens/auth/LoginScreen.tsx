import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

import LoginIllustration from '@/assets/Login.svg';
import Button from '@/components/Button/Button';
import { useAuthStore, selectIsSessionValid } from '@/stores/auth/useAuthStore';
import { useSignupStore } from '@/stores/signup/useSignupStore';
import { tokens } from '@/theme';

const HEADER_BACKGROUND = '#F0F4F8';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isSessionValid = useAuthStore(selectIsSessionValid);
  const signupEmail = useSignupStore((state) => state.draft.email);

  const [email, setEmail] = useState(
    signupEmail.trim() || 'usuario@licitafacil.mock',
  );
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSessionValid) {
      router.replace('/(tabs)' as Href);
    }
  }, [isSessionValid, router]);

  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    setLoginError('');

    try {
      await login(email, password);
    } catch {
      setLoginError('E-mail ou senha incorretos');
    }
  };

  const handleRegister = () => {
    router.push('/(signup)/step1' as Href);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.screen}>
        <View style={styles.header}>
          <LoginIllustration
            width={280}
            height={252}
            accessibilityLabel="Ilustração de boas-vindas"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.title}>Bem-vindo!</Text>

          <View style={styles.fieldGroup}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Endereço de e-mail"
              placeholderTextColor={tokens.colors.text.secondary}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
              selectionColor={tokens.colors.primary[500]}
            />
          </View>

          <View style={styles.fieldGroup}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                placeholderTextColor={tokens.colors.text.secondary}
                secureTextEntry={!showPassword}
                editable={!isLoading}
                selectionColor={tokens.colors.primary[500]}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((current) => !current)}
                accessibilityLabel={
                  showPassword ? 'Ocultar senha' : 'Mostrar senha'
                }
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

          <Pressable
            style={styles.forgotPassword}
            onPress={() => router.push('/(auth)/forgot-password' as Href)}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </Pressable>

          {loginError ? (
            <Text style={styles.loginErrorText}>{loginError}</Text>
          ) : null}

          <View style={styles.loginButtonWrapper}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={tokens.colors.primary[500]}
              />
            ) : (
              <Button
                title="Entrar"
                onPress={handleLogin}
                size="lg"
                style={styles.loginButton}
              />
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não tem conta? </Text>
            <Pressable onPress={handleRegister} disabled={isLoading}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: HEADER_BACKGROUND,
  },
  screen: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    minHeight: 260,
    backgroundColor: HEADER_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.xl,
  },
  formSection: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[50],
    paddingHorizontal: tokens.spacing.xl,
    paddingTop: tokens.spacing.xxl,
    paddingBottom: tokens.spacing.xl,
    gap: tokens.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.heading,
    marginBottom: tokens.spacing.sm,
  },
  fieldGroup: {
    gap: tokens.spacing.xs,
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
  forgotPassword: {
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    fontSize: tokens.typography.fontSize.bodyS,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.primary[500],
  },
  loginErrorText: {
    fontSize: tokens.typography.fontSize.bodyS,
    color: tokens.colors.error[500],
  },
  loginButtonWrapper: {
    marginTop: tokens.spacing.sm,
  },
  loginButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: tokens.spacing.md,
  },
  footerText: {
    fontSize: tokens.typography.fontSize.bodyM,
    color: tokens.colors.text.secondary,
  },
  footerLink: {
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.primary[500],
  },
});
