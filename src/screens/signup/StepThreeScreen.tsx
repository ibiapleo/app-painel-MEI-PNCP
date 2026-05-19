import React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import Button from '@/components/Button/Button';
import { globalStyles, tokens } from '@/theme';
import { useSignup } from '../../hooks/useSignup';


export default function StepThreeScreen() {
	const signup = useSignup('step3');
	const {
		email,
		setEmail,
		emailError,
		emailBlur,
		password,
		setPassword,
		passwordSecureTextEntry,
		focusedField,
		setFocusedField,
		showPassword,
		togglePasswordVisibility,
		handleNext,
	} = signup.step3;

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
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Seu email"
                            placeholderTextColor={tokens.colors.text.secondary}
                            selectionColor={tokens.colors.primary[500]}
                            keyboardType="email-address"
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => {
                                setFocusedField(null);
                                emailBlur();
                            }}
                            style={[
                                styles.input,
                                emailError && { borderColor: tokens.colors.error[500] },
                                focusedField === 'email' && !emailError && { borderColor: tokens.colors.primary[500] },
                            ]}
                        />
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Sua senha"
                                placeholderTextColor={tokens.colors.text.secondary}
                                selectionColor={tokens.colors.primary[500]}
                                secureTextEntry={passwordSecureTextEntry}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                style={[
                                    styles.input,
                                    styles.passwordInput,
                                    focusedField === 'password' && { borderColor: tokens.colors.primary[500] },
                                ]}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={togglePasswordVisibility}
                            >
                                <Feather
                                    name={showPassword ? 'eye' : 'eye-off'}
                                    size={20}
                                    color={tokens.colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

				<View style={styles.footerSection}>
					<Button title="Confirmar" onPress={handleNext} size="md" />
				</View>
			</View>
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
