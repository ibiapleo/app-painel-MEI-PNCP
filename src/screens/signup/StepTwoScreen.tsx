import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '@/components/StepIndicator/StepIndicator';
import Button from '@/components/Button/Button';
import { globalStyles, tokens } from '@/theme';
import { useSignup } from '../../hooks/useSignup';

export default function StepTwoScreen() {
    const signup = useSignup('step2');
    const { 
        draft, 
        errors, 
        setDraftField,
        handleCnpjBlur, 
        handleNext,
        formatCnpj,
        loadingCnaes
    } = signup.step2;

    const [focusedField, setFocusedField] = useState<string | null>(null);

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
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            value={draft.name}
                            onChangeText={(text) => setDraftField('name', text)}
                            placeholder="Seu nome completo"
                            placeholderTextColor={tokens.colors.text.secondary}
                            selectionColor={tokens.colors.primary[500]}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            style={[
                                styles.input,
                                focusedField === 'name' && { borderColor: tokens.colors.primary[500] },
                            ]}
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>CNPJ</Text>
                        <TextInput
                            value={draft.cnpj}
                            onChangeText={(text) => setDraftField('cnpj', formatCnpj(text))}
                            placeholder="XX.XXX.XXX/0001-XX"
                            keyboardType="number-pad"
                            placeholderTextColor={tokens.colors.text.secondary}
                            selectionColor={tokens.colors.primary[500]}
                            onFocus={() => setFocusedField('cnpj')}
                            onBlur={() => {
                                setFocusedField(null);
                                handleCnpjBlur();
                            }}
                            style={[
                                styles.input,
                                errors.cnpj && { borderColor: tokens.colors.error[500] },
                                focusedField === 'cnpj' && !errors.cnpj && { borderColor: tokens.colors.primary[500] },
                            ]}
                        />
                        {errors.cnpj ? <Text style={styles.errorText}>{errors.cnpj}</Text> : null}
                    </View>

                    <View style={styles.cnaesSection}>
                        <Text style={styles.label}>CNAEs</Text>
                        
                        {loadingCnaes ? (
                            <View style={{ paddingVertical: tokens.spacing.lg }}>
                                <ActivityIndicator size="small" color={tokens.colors.primary[500]} />
                                <Text style={[styles.helperText, { textAlign: 'center', marginTop: 8 }]}>Buscando CNAEs...</Text>
                            </View>
                        ) : draft.cnaes.length > 0 ? (
                            <>
                                <Text style={styles.helperText}>
                                    Encontramos os seguintes CNAEs vinculados a este CNPJ:
                                </Text>
                                <View style={styles.mockCnaesList}>
                                    {draft.cnaes.slice(0, 5).map((cnae, index) => (
                                        <View key={`${cnae.id}-${index}`} style={styles.cnaeCard}>
                                            <Text style={styles.cnaeText}>[{cnae.id}] {cnae.title}</Text>
                                        </View>
                                    ))}
                                </View>
                                {draft.cnaes.length > 5 && (
                                    <Text style={styles.moreText}>... e mais outros {draft.cnaes.length - 5}.</Text>
                                )}
                            </>
                        ) : (
                            <Text style={styles.helperText}>
                                Digite um CNPJ válido para buscarmos os CNAEs automaticamente.
                            </Text>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.footerSection}>
                    <Button 
                        title="Próximo" 
                        onPress={handleNext} 
                        size="md" 
                        disabled={loadingCnaes} 
                    />
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
