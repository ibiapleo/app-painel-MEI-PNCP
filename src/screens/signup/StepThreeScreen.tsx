import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import Button from '@/components/Button/Button';
import TermsModal from '@/components/TermsModal/TermsModal';
import { globalStyles, tokens } from '@/theme';
import { useSignup } from '../../hooks/useSignup';

export default function StepThreeScreen() {
    const signup = useSignup('step3');
    
    const {
        draft,
        errors,
        setDraftField,
        handleEmailBlur,
        handlePasswordBlur,
        handleNext,
        isSubmitting
    } = signup.step3;

    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const handleConfirm = () => {
        if (!draft.email || !draft.password) {
            return;
        }
        setShowTermsModal(true);
    };

    const handleAcceptTerms = () => {
        setShowTermsModal(false);
        handleNext();
    };

    const handleDeclineTerms = () => {
        setShowTermsModal(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.screen}>
                <View style={styles.headerSection}>
                    <View style={styles.stepIndicatorWrapper}>
                        <StepIndicator total={3} current={2} />
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={globalStyles.title}>Registro</Text>
                        <Text style={globalStyles.bodyDisabled}>
                            Crie uma conta para começar
                        </Text>
                    </View>
                </View>

                <View style={styles.formsArea}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={draft.email}
                            onChangeText={(text) => setDraftField('email', text)}
                            placeholder="Seu email"
                            placeholderTextColor={tokens.colors.text.secondary}
                            selectionColor={tokens.colors.primary[500]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!isSubmitting}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => {
                                setFocusedField(null);
                                handleEmailBlur();
                            }}
                            style={[
                                styles.input,
                                errors.email && { borderColor: tokens.colors.error[500] },
                                focusedField === 'email' && !errors.email && { borderColor: tokens.colors.primary[500] },
                            ]}
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={draft.password}
                                onChangeText={(text) => setDraftField('password', text)}
                                placeholder="Sua senha"
                                placeholderTextColor={tokens.colors.text.secondary}
                                selectionColor={tokens.colors.primary[500]}
                                secureTextEntry={!showPassword}
                                editable={!isSubmitting}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => {
                                    setFocusedField(null);
                                    handlePasswordBlur();
                                }}
                                style={[
                                    styles.input,
                                    styles.passwordInput,
                                    errors.password && { borderColor: tokens.colors.error[500] },
                                    focusedField === 'password' && !errors.password && { borderColor: tokens.colors.primary[500] },
                                ]}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                                disabled={isSubmitting}
                            >
                                <Feather
                                    name={showPassword ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={tokens.colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                    </View>
                </View>

                <View style={styles.footerSection}>
                    <Button 
                        title={isSubmitting ? "Confirmando..." : "Confirmar"} 
                        onPress={handleConfirm} 
                        size="md" 
                        disabled={isSubmitting}
                    />
                </View>
            </View>
            
            <TermsModal 
                visible={showTermsModal}
                onAccept={handleAcceptTerms}
                onCancel={handleDeclineTerms}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: tokens.colors.neutral[50],
    },
    screen: {
        flex: 1,
    },
    headerSection: {
        paddingBottom: tokens.spacing.md,
    },
    stepIndicatorWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: tokens.spacing.md,
    },
    textWrapper: {
        gap: tokens.spacing.sm,
        alignItems: 'flex-start',
        paddingHorizontal: tokens.spacing.md,
        paddingBottom: tokens.spacing.md,
    },
    formsArea: {
        flex: 1,
        paddingHorizontal: tokens.spacing.md,
        paddingTop: tokens.spacing.lg,
        paddingBottom: tokens.spacing.xl,
        gap: tokens.spacing.md,
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
        minHeight: 56,
        borderRadius: tokens.radius.md,
        borderWidth: 2,
        borderColor: tokens.colors.neutral[200],
        backgroundColor: tokens.colors.neutral[50],
        paddingHorizontal: tokens.spacing.md,
        color: tokens.colors.text.primary,
        fontSize: tokens.typography.fontSize.bodyM,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        paddingRight: 44,
    },
    eyeButton: {
        position: 'absolute',
        right: tokens.spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: tokens.spacing.md,
    },
    cnaesSection: {
        gap: tokens.spacing.sm,
        paddingTop: tokens.spacing.sm,
    },
    helperText: {
        fontSize: tokens.typography.fontSize.bodyS,
        color: tokens.colors.text.secondary,
    },
    errorText: {
        fontSize: tokens.typography.fontSize.bodyS,
        color: tokens.colors.error[500],
        fontWeight: tokens.typography.fontWeight.medium,
    },
    mockCnaesList: {
        gap: tokens.spacing.sm,
    },
    cnaeCard: {
        minHeight: 52,
        justifyContent: 'center',
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: tokens.colors.neutral[200],
        backgroundColor: tokens.colors.neutral[50],
        paddingHorizontal: tokens.spacing.md,
    },
    cnaeText: {
        fontSize: tokens.typography.fontSize.bodyS,
        color: tokens.colors.text.primary,
        fontWeight: tokens.typography.fontWeight.medium,
    },
    moreText: {
        fontSize: tokens.typography.fontSize.bodyS,
        color: tokens.colors.text.secondary,
    },
    footerSection: {
        padding: tokens.spacing.md,
    },
});