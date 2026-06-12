import React, { useMemo } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '@/components/Button/Button';
import CardCompatibility from '@/components/CardCompatibility/CardCompatibility';
import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/hooks/useTheme';
import type { OpportunityDetail } from '@/types/opportunity';
import { useOpportunities } from '@/hooks/useOpportunities';

interface EditalDetailsModalProps {
    visible: boolean;
    opportunity: OpportunityDetail | null;
    onClose: () => void;
    onToggleFavorite: (id: string) => void;
    onFollow: (id: string) => void;
    onOpenExternal?: (id: string) => void;
}

function createStyles(theme: AppTheme) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: theme.colors.background.surface,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
        },
        headerBack: {
            width: 32,
            alignItems: 'flex-start',
        },
        headerTitle: {
            fontSize: theme.typography.fontSize.h3,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
        },
        content: {
            flex: 1,
        },
        contentContainer: {
            paddingHorizontal: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
        },
        titleRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
            marginTop: theme.spacing.sm,
        },
        title: {
            flex: 1,
            fontSize: 18,
            fontWeight: theme.typography.fontWeight.extraBold,
            color: theme.colors.text.primary,
            lineHeight: 24,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 6,
        },
        infoText: {
            color: theme.colors.text.secondary,
            fontSize: 12,
            fontWeight: theme.typography.fontWeight.medium,
        },
        statsRow: {
            flexDirection: 'row',
            gap: theme.spacing.md,
            marginTop: theme.spacing.lg,
        },
        statBox: {
            flex: 1,
            backgroundColor: theme.colors.primary.muted,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
        },
        statLabel: {
            fontSize: 11,
            fontWeight: theme.typography.fontWeight.semiBold,
            color: theme.colors.text.secondary,
            marginBottom: 4,
        },
        statValue: {
            fontSize: 16,
            fontWeight: theme.typography.fontWeight.extraBold,
            color: theme.colors.text.primary,
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.border.subtle,
            marginVertical: theme.spacing.lg,
        },
        summaryHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.md,
        },
        summaryTitle: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary.main,
            letterSpacing: 0.5,
        },
        summaryText: {
            fontSize: 14,
            color: theme.colors.text.primary,
            lineHeight: 20,
        },
        descriptionText: {
            fontSize: 13,
            color: theme.colors.text.secondary,
            lineHeight: 19,
        },
        sectionLabel: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
        },
        chipsRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
        },
        chip: {
            backgroundColor: theme.colors.primary.muted,
            borderRadius: theme.radius.pill,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: 6,
        },
        chipText: {
            fontSize: 13,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.primary.main,
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.md,
            paddingHorizontal: theme.spacing.xl,
            paddingVertical: theme.spacing.md,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border.subtle,
            backgroundColor: theme.colors.background.surface,
        },
        externalButton: {
            width: 52,
            height: 52,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: theme.colors.primary.main,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background.surface,
        },
        externalButtonPressed: {
            opacity: 0.65,
        },
        followButton: {
            flex: 1,
        },
    });
}

export function EditalDetailsModal({
    visible,
    opportunity,
    onClose,
    onToggleFavorite,
    onFollow,
}: EditalDetailsModalProps) {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { openExternalLink } = useOpportunities();

    if (!opportunity) {
        return null;
    }

    const formattedValue = Number(opportunity.estimatedValue).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            presentationStyle="fullScreen"
        >
            <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} hitSlop={12} style={styles.headerBack}>
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={theme.colors.primary.main}
                        />
                    </Pressable>
                    <Text style={styles.headerTitle}>Detalhes do edital</Text>
                    <View style={styles.headerBack} />
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{opportunity.title}</Text>
                        <Pressable
                            onPress={() => onToggleFavorite(opportunity.id)}
                            hitSlop={10}
                        >
                            <Ionicons
                                name={opportunity.isFavorite ? 'heart' : 'heart-outline'}
                                size={28}
                                color={
                                    opportunity.isFavorite
                                        ? theme.colors.primary.main
                                        : theme.colors.text.primary
                                }
                            />
                        </Pressable>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="business-outline"
                            size={15}
                            color={theme.colors.text.secondary}
                        />
                        <Text style={styles.infoText}>
                            {opportunity.agency?.name || opportunity.company}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="location-outline"
                            size={15}
                            color={theme.colors.text.secondary}
                        />
                        <Text style={styles.infoText}>{opportunity.location}</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>VALOR ESTIMADO</Text>
                            <Text style={styles.statValue}>{formattedValue}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>ENCERRA EM</Text>
                            <Text style={styles.statValue}>
                                {opportunity.daysRemaining} dias
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {opportunity.compatibility && (
                        <View style={{ marginBottom: theme.spacing.lg }}>
                            <CardCompatibility
                                title={opportunity.compatibility.label}
                                score={opportunity.compatibility.score}
                            />
                        </View>
                    )}

                    <View style={styles.summaryHeader}>
                        <Ionicons
                            name="sparkles"
                            size={18}
                            color={theme.colors.primary.main}
                        />
                        <Text style={styles.summaryTitle}>RESUMO SIMPLIFICADO</Text>
                    </View>
                    <Text style={styles.summaryText}>{opportunity.description}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.descriptionText}>{opportunity.objectFull}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Modalidade</Text>
                    <View style={styles.chipsRow}>
                        <View style={styles.chip}>
                            <Text style={styles.chipText}>{opportunity.modality}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Categorias</Text>
                    <View style={styles.chipsRow}>
                        {opportunity.categories?.map((category) => (
                            <View key={category.id} style={styles.chip}>
                                <Text style={styles.chipText}>{category.name}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Pressable
                        onPress={() => openExternalLink(opportunity.pncpUrl || opportunity.id)}
                        style={({ pressed }) => [
                            styles.externalButton,
                            pressed && styles.externalButtonPressed,
                        ]}
                    >
                        <Ionicons
                            name="open-outline"
                            size={22}
                            color={theme.colors.primary.main}
                        />
                    </Pressable>
                    <Button
                        title="Acompanhar"
                        size="lg"
                        useThemeColors
                        onPress={() => onFollow(opportunity.id)}
                        style={styles.followButton}
                    />
                </View>
            </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    );
}

export default EditalDetailsModal;
