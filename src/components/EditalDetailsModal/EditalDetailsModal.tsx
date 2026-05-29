import React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Button from '@/components/Button/Button';
import CardCompatibility from '@/components/CardCompatibility/CardCompatibility'; // Importado para usar a compatibilidade
import { tokens } from '@/theme';
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

function Chip({ label }: { label: string }) {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipText}>{label}</Text>
        </View>
    );
}

export function EditalDetailsModal({
    visible,
    opportunity,
    onClose,
    onToggleFavorite,
    onFollow,
}: EditalDetailsModalProps) {
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
            presentationStyle="pageSheet"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} hitSlop={12} style={styles.headerBack}>
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={tokens.colors.primary[500]}
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
                                        ? tokens.colors.primary[500]
                                        : tokens.colors.neutral[900]
                                }
                            />
                        </Pressable>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="business-outline"
                            size={15}
                            color={tokens.colors.text.secondary}
                        />
                        <Text style={styles.infoText}>
                            {opportunity.agency?.name || opportunity.company}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons
                            name="location-outline"
                            size={15}
                            color={tokens.colors.text.secondary}
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
                        <View style={{ marginBottom: tokens.spacing.lg }}>
                            <CardCompatibility title={opportunity.compatibility.label} />
                        </View>
                    )}

                    <View style={styles.summaryHeader}>
                        <Ionicons
                            name="sparkles"
                            size={18}
                            color={tokens.colors.primary[500]}
                        />
                        <Text style={styles.summaryTitle}>RESUMO SIMPLIFICADO</Text>
                    </View>
                    <Text style={styles.summaryText}>{opportunity.description}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.descriptionText}>{opportunity.objectFull}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Modalidade</Text>
                    <View style={styles.chipsRow}>
                        <Chip label={opportunity.modality} />
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>Categorias</Text>
                    <View style={styles.chipsRow}>
                        {opportunity.categories?.map((category) => (
                            <Chip key={category.id} label={category.name} />
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
                            color={tokens.colors.primary[500]}
                        />
                    </Pressable>
                    <Button
                        title="Acompanhar"
                        size="lg"
                        onPress={() => onFollow(opportunity.id)}
                        style={styles.followButton}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: tokens.colors.neutral[50],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing.lg,
        paddingVertical: tokens.spacing.md,
    },
    headerBack: {
        width: 32,
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: tokens.typography.fontSize.h3,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.text.primary,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: tokens.spacing.xl,
        paddingBottom: tokens.spacing.xl,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
        marginTop: tokens.spacing.sm,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: tokens.typography.fontWeight.extraBold,
        color: tokens.colors.text.primary,
        lineHeight: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
    },
    infoText: {
        color: tokens.colors.text.secondary,
        fontSize: 12,
        fontWeight: tokens.typography.fontWeight.medium,
    },
    statsRow: {
        flexDirection: 'row',
        gap: tokens.spacing.md,
        marginTop: tokens.spacing.lg,
    },
    statBox: {
        flex: 1,
        backgroundColor: tokens.colors.primary[50],
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.lg,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: tokens.typography.fontWeight.semiBold,
        color: tokens.colors.text.secondary,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: tokens.typography.fontWeight.extraBold,
        color: tokens.colors.text.primary,
    },
    divider: {
        height: 1,
        backgroundColor: tokens.colors.neutral[200],
        marginVertical: tokens.spacing.lg,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        marginBottom: tokens.spacing.md,
    },
    summaryTitle: {
        fontSize: 14,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.primary[500],
        letterSpacing: 0.5,
    },
    summaryText: {
        fontSize: 14,
        color: tokens.colors.text.primary,
        lineHeight: 20,
    },
    descriptionText: {
        fontSize: 13,
        color: tokens.colors.text.secondary,
        lineHeight: 19,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.text.primary,
        marginBottom: tokens.spacing.md,
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: tokens.spacing.sm,
    },
    chip: {
        backgroundColor: tokens.colors.primary[50],
        borderRadius: tokens.radius.pill,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: 6,
    },
    chipText: {
        fontSize: 13,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.primary[500],
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.xl,
        paddingVertical: tokens.spacing.md,
        borderTopWidth: 1,
        borderTopColor: tokens.colors.neutral[200],
        backgroundColor: tokens.colors.neutral[50],
    },
    externalButton: {
        width: 52,
        height: 52,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: tokens.colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tokens.colors.neutral[50],
    },
    externalButtonPressed: {
        opacity: 0.65,
    },
    followButton: {
        flex: 1,
    },
});

export default EditalDetailsModal;