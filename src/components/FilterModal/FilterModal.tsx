import { memo, useMemo, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
    PanResponder,
    LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import Button from '@/components/Button/Button';
import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/hooks/useTheme';
import {
    useFiltersStore,
    VALUE_RANGE_MAX,
    VALUE_RANGE_MIN,
    type FiltersState,
} from '@/stores/filters/useFiltersStore';

const CATEGORIES = [
    'Tecnologia',
    'Construção',
    'Serviços',
    'Saúde',
    'Educação',
    'Alimentação',
];

const REGIONS = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
    'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
    'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
    'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
    'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
    'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins',
];

const VALOR_STEP = 100_000;

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

type SectionKey = 'categoria' | 'regiao' | 'valor';

function formatBRL(value: number): string {
    if (value >= 1_000_000) {
        const m = value / 1_000_000;
        return `R$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
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
            paddingHorizontal: 20,
            paddingVertical: 14,
        },
        headerAction: {
            color: theme.colors.primary.main,
            fontSize: 15,
            fontWeight: '500',
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: '700',
            color: theme.colors.text.primary,
        },
        content: {
            flex: 1,
        },
        contentContainer: {
            paddingHorizontal: 20,
            paddingBottom: 24,
        },
        section: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border.subtle,
            paddingVertical: 14,
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        sectionTitle: {
            fontSize: 15,
            color: theme.colors.text.primary,
            fontWeight: '500',
        },
        sectionBody: {
            marginTop: 12,
        },
        countBadge: {
            minWidth: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: theme.colors.primary.main,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 6,
        },
        countBadgeText: {
            color: theme.colors.text.onPrimary,
            fontSize: 11,
            fontWeight: '700',
        },
        chipsRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        chip: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: theme.colors.background.screen,
        },
        chipActive: {
            backgroundColor: theme.colors.primary.muted,
        },
        chipText: {
            fontSize: 11,
            fontWeight: '700',
            color: theme.colors.text.secondary,
            letterSpacing: 0.4,
        },
        chipTextActive: {
            color: theme.colors.primary.main,
        },
        searchBox: {
            marginTop: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            borderWidth: 1,
            borderColor: theme.colors.border.default,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 14,
            color: theme.colors.text.primary,
            padding: 0,
        },
        suggestionRow: {
            paddingVertical: 10,
            paddingHorizontal: 8,
        },
        suggestionText: {
            fontSize: 14,
            color: theme.colors.text.primary,
        },
        sliderBlock: {
            marginTop: 14,
        },
        sliderHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        sliderLabel: {
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.text.primary,
        },
        stepperRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        stepperButton: {
            width: 26,
            height: 26,
            borderRadius: 13,
            backgroundColor: theme.colors.background.screen,
            alignItems: 'center',
            justifyContent: 'center',
        },
        stepperValue: {
            minWidth: 70,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '600',
            color: theme.colors.text.primary,
        },
        trackHitArea: {
            paddingVertical: 10,
        },
        track: {
            height: 4,
            backgroundColor: theme.colors.border.subtle,
            borderRadius: 2,
            justifyContent: 'center',
        },
        trackFill: {
            position: 'absolute',
            left: 0,
            height: 4,
            backgroundColor: theme.colors.primary.main,
            borderRadius: 2,
        },
        thumb: {
            position: 'absolute',
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: theme.colors.primary.main,
            borderWidth: 2,
            borderColor: theme.colors.background.surface,
            top: -7,
        },
        footer: {
            paddingHorizontal: 20,
            paddingVertical: 14,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border.subtle,
        },
        applyButton: {
            borderRadius: 999,
        },
    });
}

interface ValueSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    styles: ReturnType<typeof createStyles>;
    theme: AppTheme;
}

function ValueSlider({ label, value, onChange, styles, theme }: ValueSliderProps) {
    const [trackWidth, setTrackWidth] = useState(0);
    const startValueRef = useRef(value);
    const trackWidthRef = useRef(trackWidth);
    trackWidthRef.current = trackWidth;

    const range = VALUE_RANGE_MAX - VALUE_RANGE_MIN;
    const ratio = (value - VALUE_RANGE_MIN) / range;
    const thumbX = Math.max(0, Math.min(1, ratio)) * trackWidth;

    const snap = (n: number) => {
        const snapped = Math.round(n / VALOR_STEP) * VALOR_STEP;
        return Math.max(VALUE_RANGE_MIN, Math.min(VALUE_RANGE_MAX, snapped));
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onStartShouldSetPanResponderCapture: () => true,
                onMoveShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponderCapture: () => true,
                onPanResponderTerminationRequest: () => false,
                onPanResponderGrant: (evt) => {
                    const w = trackWidthRef.current;
                    if (w <= 0) {
                        startValueRef.current = value;
                        return;
                    }
                    const x = evt.nativeEvent.locationX;
                    const r = Math.max(0, Math.min(1, x / w));
                    const v = snap(VALUE_RANGE_MIN + r * range);
                    startValueRef.current = v;
                    onChange(v);
                },
                onPanResponderMove: (_evt, gestureState) => {
                    const w = trackWidthRef.current;
                    if (w <= 0) return;
                    const delta = (gestureState.dx / w) * range;
                    onChange(snap(startValueRef.current + delta));
                },
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onChange, range]
    );

    const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

    return (
        <View style={styles.sliderBlock}>
            <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>{label}</Text>
                <View style={styles.stepperRow}>
                    <Pressable
                        onPress={() => onChange(value - VALOR_STEP)}
                        style={styles.stepperButton}
                        hitSlop={6}
                    >
                        <Feather name="minus" size={14} color={theme.colors.text.primary} />
                    </Pressable>
                    <Text style={styles.stepperValue}>{formatBRL(value)}</Text>
                    <Pressable
                        onPress={() => onChange(value + VALOR_STEP)}
                        style={styles.stepperButton}
                        hitSlop={6}
                    >
                        <Feather name="plus" size={14} color={theme.colors.primary.main} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.trackHitArea} {...panResponder.panHandlers}>
                <View style={styles.track} onLayout={onLayout}>
                    <View style={[styles.trackFill, { width: thumbX }]} />
                    <View style={[styles.thumb, { left: thumbX - 9 }]} />
                </View>
            </View>
        </View>
    );
}

function CategorySection({
    expanded,
    onToggle,
    selected,
    onSelect,
    styles,
    theme,
}: {
    expanded: boolean;
    onToggle: () => void;
    selected: string[];
    onSelect: (v: string) => void;
    styles: ReturnType<typeof createStyles>;
    theme: AppTheme;
}) {
    return (
        <SectionShell
            title="Categoria"
            expanded={expanded}
            onToggle={onToggle}
            count={selected.length}
            styles={styles}
            theme={theme}
        >
            <View style={styles.chipsRow}>
                {CATEGORIES.map((c) => {
                    const isOn = selected.includes(c);
                    return (
                        <Pressable
                            key={c}
                            onPress={() => onSelect(c)}
                            style={[styles.chip, isOn && styles.chipActive]}
                        >
                            <Text style={[styles.chipText, isOn && styles.chipTextActive]}>
                                {c.toUpperCase()}
                            </Text>
                            {isOn && <Feather name="x" size={12} color={theme.colors.primary.main} />}
                        </Pressable>
                    );
                })}
            </View>
        </SectionShell>
    );
}

function RegionSection({
    expanded,
    onToggle,
    selected,
    onSelect,
    styles,
    theme,
}: {
    expanded: boolean;
    onToggle: () => void;
    selected: string[];
    onSelect: (v: string) => void;
    styles: ReturnType<typeof createStyles>;
    theme: AppTheme;
}) {
    const [query, setQuery] = useState('');
    const suggestions = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return REGIONS.filter(
            (r) => r.toLowerCase().startsWith(q) && !selected.includes(r)
        ).slice(0, 6);
    }, [query, selected]);

    return (
        <SectionShell
            title="Região"
            expanded={expanded}
            onToggle={onToggle}
            count={selected.length}
            styles={styles}
            theme={theme}
        >
            <View style={styles.chipsRow}>
                {selected.map((r) => (
                    <Pressable
                        key={r}
                        onPress={() => onSelect(r)}
                        style={[styles.chip, styles.chipActive]}
                    >
                        <Text style={[styles.chipText, styles.chipTextActive]}>
                            {r.toUpperCase()}
                        </Text>
                        <Feather name="x" size={12} color={theme.colors.primary.main} />
                    </Pressable>
                ))}
            </View>

            <View style={styles.searchBox}>
                <Feather name="search" size={16} color={theme.colors.text.secondary} />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Buscar estado..."
                    placeholderTextColor={theme.colors.text.secondary}
                    style={styles.searchInput}
                />
            </View>

            {suggestions.map((s) => (
                <Pressable
                    key={s}
                    onPress={() => {
                        onSelect(s);
                        setQuery('');
                    }}
                    style={styles.suggestionRow}
                >
                    <Text style={styles.suggestionText}>{s}</Text>
                </Pressable>
            ))}
        </SectionShell>
    );
}

function SectionShell({
    title,
    expanded,
    onToggle,
    count,
    children,
    styles,
    theme,
}: {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    count: number;
    children: React.ReactNode;
    styles: ReturnType<typeof createStyles>;
    theme: AppTheme;
}) {
    return (
        <View style={styles.section}>
            <Pressable onPress={onToggle} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {count > 0 ? (
                    <View style={styles.countBadge}>
                        <Text style={styles.countBadgeText}>{count}</Text>
                    </View>
                ) : (
                    <Feather
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={theme.colors.text.secondary}
                    />
                )}
            </Pressable>
            {expanded && <View style={styles.sectionBody}>{children}</View>}
        </View>
    );
}

function FilterModalImpl({ visible, onClose }: FilterModalProps) {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const categories = useFiltersStore((s) => s.categories);
    const regions = useFiltersStore((s) => s.regions);
    const valueMin = useFiltersStore((s) => s.valueMin);
    const valueMax = useFiltersStore((s) => s.valueMax);
    const toggleCategory = useFiltersStore((s) => s.toggleCategory);
    const toggleRegion = useFiltersStore((s) => s.toggleRegion);
    const setValueMin = useFiltersStore((s) => s.setValueMin);
    const setValueMax = useFiltersStore((s) => s.setValueMax);
    const clearAll = useFiltersStore((s) => s.clearAll);

    const [expanded, setExpanded] = useState<SectionKey | null>('regiao');

    const toggle = (key: SectionKey) =>
        setExpanded((prev) => (prev === key ? null : key));

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            presentationStyle="fullScreen"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} hitSlop={10}>
                        <Text style={styles.headerAction}>Cancelar</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Filtros</Text>
                    <Pressable onPress={clearAll} hitSlop={10}>
                        <Text style={styles.headerAction}>Limpar tudo</Text>
                    </Pressable>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <CategorySection
                        expanded={expanded === 'categoria'}
                        onToggle={() => toggle('categoria')}
                        selected={categories}
                        onSelect={toggleCategory}
                        styles={styles}
                        theme={theme}
                    />

                    <RegionSection
                        expanded={expanded === 'regiao'}
                        onToggle={() => toggle('regiao')}
                        selected={regions}
                        onSelect={toggleRegion}
                        styles={styles}
                        theme={theme}
                    />

                    <SectionShell
                        title="Valor Estimado"
                        expanded={expanded === 'valor'}
                        onToggle={() => toggle('valor')}
                        count={
                            valueMin > VALUE_RANGE_MIN || valueMax < VALUE_RANGE_MAX ? 1 : 0
                        }
                        styles={styles}
                        theme={theme}
                    >
                        <ValueSlider
                            label="Mínimo"
                            value={valueMin}
                            onChange={setValueMin}
                            styles={styles}
                            theme={theme}
                        />
                        <ValueSlider
                            label="Máximo"
                            value={valueMax}
                            onChange={setValueMax}
                            styles={styles}
                            theme={theme}
                        />
                    </SectionShell>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title="Aplicar filtros"
                        size="lg"
                        useThemeColors
                        onPress={onClose}
                        style={styles.applyButton}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export const FilterModal = memo(FilterModalImpl);
export type { FiltersState };
