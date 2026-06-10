import { memo, useMemo, useRef, useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    ScrollView,
    TextInput,
    PanResponder,
    LayoutChangeEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Button from '@/components/Button/Button';
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

const STEP = 1_000_000;

interface ValueSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

function ValueSlider({ label, value, onChange }: ValueSliderProps) {
    const [trackWidth, setTrackWidth] = useState(0);
    const valueRef = useRef(value);
    valueRef.current = value;

    const ratio = (value - VALUE_RANGE_MIN) / (VALUE_RANGE_MAX - VALUE_RANGE_MIN);
    const thumbX = Math.max(0, Math.min(1, ratio)) * trackWidth;

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (evt) => {
                    if (trackWidth <= 0) return;
                    const x = evt.nativeEvent.locationX;
                    const r = Math.max(0, Math.min(1, x / trackWidth));
                    onChange(Math.round(VALUE_RANGE_MIN + r * (VALUE_RANGE_MAX - VALUE_RANGE_MIN)));
                },
                onPanResponderMove: (evt) => {
                    if (trackWidth <= 0) return;
                    const x = evt.nativeEvent.locationX;
                    const r = Math.max(0, Math.min(1, x / trackWidth));
                    onChange(Math.round(VALUE_RANGE_MIN + r * (VALUE_RANGE_MAX - VALUE_RANGE_MIN)));
                },
            }),
        [trackWidth, onChange]
    );

    const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

    return (
        <View style={styles.sliderBlock}>
            <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>{label}</Text>
                <View style={styles.stepperRow}>
                    <Pressable
                        onPress={() => onChange(value - STEP)}
                        style={styles.stepperButton}
                        hitSlop={6}
                    >
                        <Feather name="minus" size={14} color="#202124" />
                    </Pressable>
                    <Text style={styles.stepperValue}>{formatBRL(value)}</Text>
                    <Pressable
                        onPress={() => onChange(value + STEP)}
                        style={styles.stepperButton}
                        hitSlop={6}
                    >
                        <Feather name="plus" size={14} color="#0877FF" />
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
}: {
    expanded: boolean;
    onToggle: () => void;
    selected: string[];
    onSelect: (v: string) => void;
}) {
    return (
        <SectionShell
            title="Categoria"
            expanded={expanded}
            onToggle={onToggle}
            count={selected.length}
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
                            {isOn && <Feather name="x" size={12} color="#0877FF" />}
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
}: {
    expanded: boolean;
    onToggle: () => void;
    selected: string[];
    onSelect: (v: string) => void;
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
                        <Feather name="x" size={12} color="#0877FF" />
                    </Pressable>
                ))}
            </View>

            <View style={styles.searchBox}>
                <Feather name="search" size={16} color="#777A83" />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Buscar estado..."
                    placeholderTextColor="#A0A0A5"
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
}: {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    count: number;
    children: React.ReactNode;
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
                        color="#777A83"
                    />
                )}
            </Pressable>
            {expanded && <View style={styles.sectionBody}>{children}</View>}
        </View>
    );
}

function FilterModalImpl({ visible, onClose }: FilterModalProps) {
    const filters = useFiltersStore();
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
                        <Text style={styles.headerAction}>Cancel</Text>
                    </Pressable>
                    <Text style={styles.headerTitle}>Filter</Text>
                    <Pressable onPress={filters.clearAll} hitSlop={10}>
                        <Text style={styles.headerAction}>Clear All</Text>
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
                        selected={filters.categories}
                        onSelect={filters.toggleCategory}
                    />

                    <RegionSection
                        expanded={expanded === 'regiao'}
                        onToggle={() => toggle('regiao')}
                        selected={filters.regions}
                        onSelect={filters.toggleRegion}
                    />

                    <SectionShell
                        title="Valor Estimado"
                        expanded={expanded === 'valor'}
                        onToggle={() => toggle('valor')}
                        count={
                            filters.valueMin > VALUE_RANGE_MIN ||
                            filters.valueMax < VALUE_RANGE_MAX
                                ? 1
                                : 0
                        }
                    >
                        <ValueSlider
                            label="Mínimo"
                            value={filters.valueMin}
                            onChange={filters.setValueMin}
                        />
                        <ValueSlider
                            label="Máximo"
                            value={filters.valueMax}
                            onChange={filters.setValueMax}
                        />
                    </SectionShell>
                </ScrollView>

                <View style={styles.footer}>
                    <Button title="Apply Filters" size="lg" onPress={onClose} style={styles.applyButton} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export const FilterModal = memo(FilterModalImpl);
export type { FiltersState };

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    headerAction: {
        color: '#0877FF',
        fontSize: 15,
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#202124',
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
        borderBottomColor: '#E9EBF1',
        paddingVertical: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 15,
        color: '#202124',
        fontWeight: '500',
    },
    sectionBody: {
        marginTop: 12,
    },
    countBadge: {
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#0877FF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    countBadgeText: {
        color: '#FFFFFF',
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
        backgroundColor: '#F5F6FA',
    },
    chipActive: {
        backgroundColor: '#EAF2FF',
    },
    chipText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#777A83',
        letterSpacing: 0.4,
    },
    chipTextActive: {
        color: '#0877FF',
    },
    searchBox: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#D4D6DB',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#202124',
        padding: 0,
    },
    suggestionRow: {
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    suggestionText: {
        fontSize: 14,
        color: '#202124',
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
        color: '#202124',
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
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepperValue: {
        minWidth: 70,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#202124',
    },
    trackHitArea: {
        paddingVertical: 10,
    },
    track: {
        height: 4,
        backgroundColor: '#E9EBF1',
        borderRadius: 2,
        justifyContent: 'center',
    },
    trackFill: {
        position: 'absolute',
        left: 0,
        height: 4,
        backgroundColor: '#0877FF',
        borderRadius: 2,
    },
    thumb: {
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#0877FF',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        top: -7,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: '#E9EBF1',
    },
    applyButton: {
        borderRadius: 999,
    },
});
