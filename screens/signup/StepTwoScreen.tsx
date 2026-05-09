import React, { useMemo } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
} from 'react-native';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import Button from '@/components/Button/Button';
import { globalStyles, tokens } from '@/theme';
import { useSignup } from '../../hooks/useSignup';

const MOCK_CNAES = [
	'[10503-8] PRODUÇÃO DE SORVETES',
	'[10503-8] PRODUÇÃO DE SORVETES',
	'[10503-8] PRODUÇÃO DE SORVETES',
	'[10503-8] PRODUÇÃO DE SORVETES',
	'[10503-8] PRODUÇÃO DE SORVETES',
];

export default function StepTwoScreen() {
	const signup = useSignup('step2');
	const { fields: formFields, focusedField, setFocusedField, handleNext } = signup.step2;

	const visibleCnaes = useMemo(() => MOCK_CNAES.slice(0, 5), []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.screen}>
				<View style={styles.headerSection}>
					<View style={styles.stepIndicatorWrapper}>
						<StepIndicator total={3} current={1} />
					</View>

					<View style={styles.textWrapper}>
						<Text style={globalStyles.title}>Registro</Text>
						<Text style={globalStyles.bodyDisabled}>
							Crie uma conta para começar
						</Text>
					</View>
				</View>

				<ScrollView
					style={styles.scrollArea}
					contentContainerStyle={styles.content}
					showsVerticalScrollIndicator={false}
 				>
          {formFields.map((field) => (
						<View key={field.id} style={styles.fieldGroup}>
							<Text style={styles.label}>{field.label}</Text>
							<TextInput
								value={field.value}
								onChangeText={field.onChangeText}
								placeholder={field.placeholder}
								placeholderTextColor={tokens.colors.text.secondary}
								selectionColor={tokens.colors.primary[500]}
								keyboardType={field.keyboardType}
								onFocus={() => setFocusedField(field.id)}
								onBlur={() => {
									setFocusedField(null);
									field.onBlur?.();
								}}
								style={[
									styles.input,
									field.error && { borderColor: tokens.colors.error[500] },
									focusedField === field.id && !field.error && { borderColor: tokens.colors.primary[500] },
								]}
							/>
							{field.error ? <Text style={styles.errorText}>{field.error}</Text> : null}
						</View>
					))}

					<View style={styles.cnaesSection}>
						<Text style={styles.label}>CNAEs</Text>
						<Text style={styles.helperText}>
							Buscamos automaticamente através do seu CNPJ.
						</Text>

						<View style={styles.mockCnaesList}>
							{visibleCnaes.map((cnae, index) => (
								<View key={`${cnae}-${index}`} style={styles.cnaeCard}>
									<Text style={styles.cnaeText}>{cnae};</Text>
								</View>
							))}
						</View>

						<Text style={styles.moreText}>... e mais outros 14.</Text>
					</View>
				</ScrollView>

				<View style={styles.footerSection}>
							<Button title="Próximo" onPress={handleNext} size="md" />
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
	scrollArea: {
		flex: 1,
	},
	content: {
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
