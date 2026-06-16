import { useMemo, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {useTheme} from '@/hooks/useTheme';
import { tokens } from '@/theme';
import { locationService, type LocationState } from '@/services/authService';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: EditProfileData) => Promise<void>;
    initialData: {
        name?: string;
        cnpj?: string;
        interested_state_siglas?: string[];
    };
    isLoading?: boolean;
}

export interface EditProfileData {
    name: string;
    cnpj: string;
    interested_state_siglas: string[];
}

export default function EditProfileModal({
                                             visible,
                                             onClose,
                                             onSave,
                                             initialData,
                                             isLoading = false,
                                         }: EditProfileModalProps) {
    const theme = useTheme();
    const [name, setName] = useState(initialData.name || '');
    const [selectedStates, setSelectedStates] = useState<string[]>(
        initialData.interested_state_siglas || []
    );
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [states, setStates] = useState<LocationState[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [expandedStates, setExpandedStates] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (visible && states.length === 0) {
            loadStates();
        }
    }, [visible, states.length]);

    useEffect(() => {
        if (!visible) {
            setName(initialData.name || '');
            setCnpj(formatCnpj(initialData.cnpj || ''));
            setSelectedStates(initialData.interested_state_siglas || []);
            setFocusedField(null);
            setExpandedStates(false);
            setSearchText('');
        }
    }, [visible, initialData]);

    const loadStates = async () => {
        try {
            setLoadingStates(true);
            const statesList = await locationService.getStates();
            setStates(statesList);
        } catch (error) {
            console.error('Erro ao carregar estados:', error);
        } finally {
            setLoadingStates(false);
        }
    };

    const formatCnpj = (value: string) => {
        const numbers = value.replace(/\D/g, '').slice(0, 14);
        return numbers
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    };

    const [cnpj, setCnpj] = useState(() => formatCnpj(initialData.cnpj || ''));

    const handleCnpjChange = (value: string) => {
        setCnpj(formatCnpj(value));
    };

    const filteredStates = states.filter((state) =>
        state.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        state.sigla.toLowerCase().includes(searchText.toLowerCase())
    );

    const toggleState = (sigla: string) => {
        setSelectedStates((prev) =>
            prev.includes(sigla) ? prev.filter((s) => s !== sigla) : [...prev, sigla]
        );
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'Por favor, informe um nome válido');
            return;
        }

        if (!cnpj.trim() || cnpj.replace(/\D/g, '').length !== 14) {
            Alert.alert('Erro', 'Por favor, informe um CNPJ válido');
            return;
        }

        if (selectedStates.length === 0) {
            Alert.alert('Erro', 'Por favor, selecione pelo menos um estado');
            return;
        }

        try {
            await onSave({
                name: name.trim(),
                cnpj: cnpj.replace(/\D/g, ''),
                interested_state_siglas: selectedStates,
            });
            onClose();
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
        }
    };

    const styles = useMemo(
        () =>
            StyleSheet.create({
                overlay: {
                    flex: 1,
                    backgroundColor: 'rgba(58, 61, 64, 0.6)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 24,
                },
                card: {
                    backgroundColor: theme.colors.background.surface,
                    borderRadius: 28,
                    paddingVertical: 24,
                    paddingHorizontal: 24,
                    width: '100%',
                    maxWidth: 340,
                    maxHeight: '80%',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 5,
                },
                title: {
                    fontSize: 22,
                    fontWeight: '700',
                    color: theme.colors.text.primary,
                    textAlign: 'center',
                    marginBottom: 20,
                },
                scrollContent: {
                    gap: 16,
                },
                fieldGroup: {
                    gap: 8,
                },
                label: {
                    fontSize: 14,
                    fontWeight: '600',
                    color: theme.colors.text.label,
                },
                input: {
                    minHeight: 48,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: theme.colors.border.default,
                    backgroundColor: theme.colors.background.screen,
                    paddingHorizontal: 12,
                    color: theme.colors.text.primary,
                    fontSize: 14,
                },
                statesContainer: {
                    gap: 8,
                },
                statesHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                },
                statesLabel: {
                    fontSize: 14,
                    fontWeight: '600',
                    color: theme.colors.text.label,
                },
                expandIcon: {
                    fontSize: 20,
                },
                searchInput: {
                    minHeight: 40,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: theme.colors.border.default,
                    backgroundColor: theme.colors.background.screen,
                    paddingHorizontal: 12,
                    color: theme.colors.text.primary,
                    fontSize: 13,
                },
                statesList: {
                    maxHeight: 180,
                },
                stateItem: {
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: theme.colors.background.screen,
                    borderWidth: 1,
                    borderColor: theme.colors.border.default,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                },
                stateItemSelected: {
                    backgroundColor: theme.isDark ? tokens.colors.neutral[700] : tokens.colors.primary[50],
                    borderColor: theme.colors.primary.main,
                },
                stateText: {
                    fontSize: 14,
                    color: theme.colors.text.primary,
                    fontWeight: '500',
                },
                stateTextSelected: {
                    color: theme.colors.primary.main,
                },
                selectedStatesTag: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginTop: 8,
                },
                stateTag: {
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderWidth: 1,
                    backgroundColor: theme.isDark ? tokens.colors.neutral[700] : tokens.colors.primary[50],
                    borderColor: theme.colors.primary.main,
                },
                stateTagText: {
                    fontSize: 12,
                    fontWeight: '500',
                    color: theme.colors.primary.main,
                },
                buttonContainer: {
                    flexDirection: 'row',
                    width: '100%',
                    gap: 8,
                    marginTop: 16,
                },
                cancelButton: {
                    flex: 1,
                    height: 48,
                    borderWidth: 1.5,
                    borderColor: theme.colors.primary.main,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                cancelButtonText: {
                    color: theme.colors.primary.main,
                    fontSize: 14,
                    fontWeight: '600',
                },
                saveButton: {
                    flex: 1,
                    height: 48,
                    backgroundColor: theme.colors.primary.main,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                saveButtonText: {
                    color: theme.colors.text.onPrimary,
                    fontSize: 14,
                    fontWeight: '600',
                },
                disabledButton: {
                    opacity: 0.5,
                },
                loadingContainer: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                },
            }),
        [theme]
    );

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.title}>Editar Perfil</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={expandedStates}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Name Field */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Seu nome"
                                placeholderTextColor={theme.colors.text.secondary}
                                selectionColor={tokens.colors.primary[500]}
                                editable={!isLoading}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                style={[
                                    styles.input,
                                    focusedField === 'name' && { borderColor: tokens.colors.primary[500] },
                                ]}
                            />
                        </View>

                        {/* CNPJ Field */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>CNPJ</Text>
                            <TextInput
                                value={cnpj}
                                onChangeText={handleCnpjChange}
                                placeholder="XX.XXX.XXX/0001-XX"
                                placeholderTextColor={theme.colors.text.secondary}
                                selectionColor={tokens.colors.primary[500]}
                                keyboardType="number-pad"
                                editable={!isLoading}
                                onFocus={() => setFocusedField('cnpj')}
                                onBlur={() => setFocusedField(null)}
                                style={[
                                    styles.input,
                                    focusedField === 'cnpj' && { borderColor: tokens.colors.primary[500] },
                                ]}
                            />
                        </View>

                        {/* States Selection */}
                        <View style={styles.statesContainer}>
                            <TouchableOpacity
                                onPress={() => setExpandedStates(!expandedStates)}
                                disabled={isLoading}
                                style={styles.statesHeader}
                            >
                                <Text style={styles.statesLabel}>Estados de Interesse</Text>
                                <Feather
                                    name={expandedStates ? 'chevron-up' : 'chevron-down'}
                                    size={20}
                                    color={tokens.colors.primary[500]}
                                />
                            </TouchableOpacity>

                            {expandedStates && (
                                <>
                                    <TextInput
                                        value={searchText}
                                        onChangeText={setSearchText}
                                        placeholder="Buscar estado..."
                                        placeholderTextColor={theme.colors.text.secondary}
                                        style={styles.searchInput}
                                        editable={!loadingStates}
                                    />

                                    {loadingStates ? (
                                        <View style={styles.loadingContainer}>
                                            <ActivityIndicator color={tokens.colors.primary[500]} />
                                        </View>
                                    ) : (
                                        <ScrollView style={styles.statesList} nestedScrollEnabled>
                                            {filteredStates.map((item) => {
                                                const isSelected = selectedStates.includes(item.sigla);

                                                return (
                                                    <TouchableOpacity
                                                        key={item.id}
                                                        style={[
                                                            styles.stateItem,
                                                            isSelected && styles.stateItemSelected,
                                                        ]}
                                                        onPress={() => toggleState(item.sigla)}
                                                        disabled={isLoading}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.stateText,
                                                                isSelected && styles.stateTextSelected,
                                                            ]}
                                                        >
                                                            {item.nome}
                                                        </Text>

                                                        {isSelected && (
                                                            <Feather
                                                                name="check"
                                                                size={18}
                                                                color={tokens.colors.primary[500]}
                                                            />
                                                        )}
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </ScrollView>
                                    )}

                                    {selectedStates.length > 0 && (
                                        <View style={styles.selectedStatesTag}>
                                            {selectedStates.map((sigla) => (
                                                <View key={sigla} style={styles.stateTag}>
                                                    <Text style={styles.stateTagText}>{sigla}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                            disabled={isLoading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.saveButton, isLoading && styles.disabledButton]}
                            onPress={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}