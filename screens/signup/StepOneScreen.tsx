import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { globalStyles, tokens } from '@/theme';
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Button from "@/components/Button/Button";
import { type IBGEState } from "@/services/ibge";
import { useSignup } from "../../hooks/useSignup";

export default function StepOneScreen() {
    const signup = useSignup('step1');
    const { filteredStates, loadingStates, searchText, setSearchText, selectedStates, toggleState, handleNext } = signup.step1;

    const renderState = ({ item }: { item: IBGEState }) => {
        const isSelected = selectedStates.includes(item.id);
        return (
            <TouchableOpacity
                style={[
                    styles.stateItem,
                    isSelected && styles.stateItemSelected,
                ]}
                onPress={() => toggleState(item.id)}
            >
                <View style={styles.stateRow}>
                    <Text style={styles.stateText}>
                        {item.nome}
                    </Text>

                    {isSelected ? (
                        <Feather
                            name="check"
                            size={18}
                            color={tokens.colors.primary[500]}
                        />
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.screen}>
                <View style={styles.headerSection}>
                    <View style={styles.stepIndicatorWrapper}>
                        <StepIndicator total={3} current={0} />
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={globalStyles.title}>Refine a sua busca</Text>
                        <Text style={globalStyles.bodyDisabled}>Informe quais estados que atua e deseja ser informado de editais compatíveis.</Text>
                    </View>

                    <SearchComponent 
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Buscar estado..."
                    />
                </View>

                <View style={styles.middleSection}>
                    {loadingStates ? (
                        <View style={styles.centerContent}>
                            <ActivityIndicator size="large" color={tokens.colors.primary[500]} />
                        </View>
                    ) : (
                        <FlatList
                            data={filteredStates}
                            keyExtractor={(item) => item.id}
                            renderItem={renderState}
                            scrollEnabled={true}
                            contentContainerStyle={styles.listContent}
                        />
                    )}
                </View>

                <View style={styles.footerSection}>
                    <Button
                        title="Próximo"
                        onPress={handleNext}
                        size="md"
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
    justifyContent: 'space-between',
  },
  headerSection: {
    paddingBottom: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.neutral[200],
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
    paddingVertical: tokens.spacing.md,
  },
  middleSection: {
    flex: 1,
    overflow: 'hidden',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
  stateItem: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.neutral[50],
    borderWidth: 1,
    borderColor: tokens.colors.neutral[200],
  },
  stateItemSelected: {
    backgroundColor: tokens.colors.primary[50],
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.md,
  },
  stateText: {
    fontSize: tokens.typography.fontSize.bodyM,
    color: tokens.colors.text.primary,
    fontWeight: '500',
  },
  footerSection: {
    padding: tokens.spacing.md,
  },
});