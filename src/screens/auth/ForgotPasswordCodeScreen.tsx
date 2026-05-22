import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import Button from '@/components/Button/Button';
import { usePasswordRecoveryStore } from '@/stores/auth/passwordRecovery';
import { tokens } from '@/theme';

const CODE_LENGTH = 4;
const MOCK_RECOVERY_CODE = '0000';

export default function ForgotPasswordCodeScreen() {
  const router = useRouter();
  const setVerifiedEmail = usePasswordRecoveryStore(
    (state) => state.setVerifiedEmail,
  );
  const { email } = useLocalSearchParams<{ email: string }>();
  const displayEmail = typeof email === 'string' ? email : '';

  const [digits, setDigits] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => ''),
  );
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [error, setError] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const code = digits.join('');

  const updateDigit = (text: string, index: number) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    setDigits(nextDigits);

    if (error) {
      setError('');
    }

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      !digits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleResend = () => {
    setDigits(Array.from({ length: CODE_LENGTH }, () => ''));
    setError('');
    inputRefs.current[0]?.focus();
    setFocusedIndex(0);
    Alert.alert(
      'Código reenviado',
      `Um novo código mock foi enviado para ${displayEmail || 'seu e-mail'}. Use 0000 para testar.`,
    );
  };

  const handleContinue = () => {
    if (code.length < CODE_LENGTH) {
      setError('Digite o código completo');
      return;
    }

    if (code !== MOCK_RECOVERY_CODE) {
      setError('Código inválido. Use 0000 para testes.');
      return;
    }

    setVerifiedEmail(displayEmail);
    router.push('/(auth)/forgot-password/new-password' as Href);
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
        <Text style={styles.title}>Digite o código de confirmação</Text>
        <Text style={styles.subtitle}>
          Enviamos um código de 4 dígitos para{' '}
          <Text style={styles.emailHighlight}>
            {displayEmail || 'seu e-mail'}
          </Text>
        </Text>

        <View style={styles.codeRow}>
          {digits.map((digit, index) => {
            const isFocused = focusedIndex === index;

            return (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  isFocused && styles.codeInputFocused,
                  error ? styles.codeInputError : null,
                ]}
                value={digit}
                onChangeText={(text) => updateDigit(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                onFocus={() => setFocusedIndex(index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                selectionColor={tokens.colors.primary[500]}
              />
            );
          })}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleResend} style={styles.resendButton}>
          <Text style={styles.resendText}>Reenviar código</Text>
        </Pressable>

        <Button
          title="Continuar"
          onPress={handleContinue}
          size="lg"
          style={styles.primaryButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const CODE_BOX_SIZE = 56;

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
    alignItems: 'center',
    gap: tokens.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.heading,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: tokens.typography.fontSize.bodyM,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: tokens.spacing.sm,
  },
  emailHighlight: {
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.text.primary,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: tokens.spacing.md,
    marginTop: tokens.spacing.md,
  },
  codeInput: {
    width: CODE_BOX_SIZE,
    height: CODE_BOX_SIZE,
    borderWidth: 1,
    borderColor: tokens.colors.neutral[300],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.neutral[50],
    fontSize: 24,
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.text.primary,
    textAlign: 'center',
  },
  codeInputFocused: {
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
  },
  codeInputError: {
    borderColor: tokens.colors.error[500],
  },
  errorText: {
    fontSize: tokens.typography.fontSize.bodyS,
    color: tokens.colors.error[500],
    textAlign: 'center',
  },
  resendButton: {
    paddingVertical: tokens.spacing.sm,
  },
  resendText: {
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.primary[500],
  },
  primaryButton: {
    width: '100%',
    marginTop: tokens.spacing.sm,
  },
});
