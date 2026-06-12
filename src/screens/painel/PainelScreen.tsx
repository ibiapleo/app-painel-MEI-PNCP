import { memo, useCallback, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SectionList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

import { FavoriteCard } from '@/components/FavoriteCard/FavoriteCard';
import { FavoritesCalendar, type MarkType } from '@/components/FavoritesCalendar/FavoritesCalendar';
import { useFavorites } from '@/hooks/useFavorites';
import { useNotifications } from '@/hooks/useNotifications';
import { useTheme } from '@/hooks/useTheme';
import type { AppTheme } from '@/hooks/useTheme';
import type { Opportunity } from '@/types/opportunity';
import type { FavoritesTab } from '@/stores/favorites/types';

const TABS: FavoritesTab[] = ['Em andamento', 'Encerrados'];

const MONTH_LABELS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

type SortOrder = 'soonest' | 'latest';

function pad(n: number) {
    return n < 10 ? `0${n}` : `${n}`;
}

function formatCurrency(value: number): string {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(base: Date, days: number): Date {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
}

function toDayKey(d: Date): string {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatSectionTitle(dayKey: string): string {
    const [, m, d] = dayKey.split('-').map(Number);
    return `${MONTH_LABELS_SHORT[m - 1]} ${d}`;
}

function createStyles(theme: AppTheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background.screen,
        },
        header: {
            paddingHorizontal: 24,
            paddingTop: 44,
            paddingBottom: 12,
            backgroundColor: theme.colors.background.surface,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '800',
            color: theme.colors.text.primary,
        },
        notificationWrapper: {
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            top: -6,
            right: -6,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: theme.colors.primary.main,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
        },
        badgeText: {
            color: theme.colors.text.onPrimary,
            fontSize: 10,
            fontWeight: '700',
        },
        listContent: {
            paddingBottom: 24,
        },
        tabsWrapper: {
            backgroundColor: theme.colors.background.surface,
            paddingHorizontal: 24,
            paddingBottom: 12,
            paddingTop: 4,
        },
        tabsContainer: {
            height: 40,
            backgroundColor: theme.colors.background.screen,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 4,
        },
        tabWrapper: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        tab: {
            flex: 1,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activeTab: {
            backgroundColor: theme.colors.background.surface,
        },
        tabText: {
            color: theme.colors.text.secondary,
            fontSize: 12,
            fontWeight: '700',
        },
        activeTabText: {
            color: theme.colors.text.primary,
        },
        tabSeparator: {
            width: 1,
            height: 14,
            backgroundColor: theme.colors.border.default,
        },
        sortButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            alignSelf: 'flex-end',
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginTop: 8,
        },
        sortText: {
            color: theme.colors.primary.main,
            fontSize: 12,
            fontWeight: '600',
        },
        sectionHeader: {
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.text.primary,
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 8,
        },
        feedback: {
            marginTop: 24,
        },
        error: {
            marginTop: 24,
            textAlign: 'center',
            color: theme.error[500],
            fontWeight: '600',
            paddingHorizontal: 24,
        },
        emptyState: {
            marginTop: 32,
            textAlign: 'center',
            color: theme.colors.text.secondary,
            fontSize: 14,
            paddingHorizontal: 24,
        },
    });
}

const PainelHeader = memo(function PainelHeader({
    notificationCount,
    styles,
    iconColor,
}: {
    notificationCount: number;
    styles: ReturnType<typeof createStyles>;
    iconColor: string;
}) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Painel</Text>
            <View style={styles.notificationWrapper}>
                <Ionicons name="notifications-outline" size={27} color={iconColor} />
                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
});

const TabsAndSort = memo(function TabsAndSort({
    activeTab,
    onChangeTab,
    sortOrder,
    onToggleSort,
    styles,
    primaryColor,
}: {
    activeTab: FavoritesTab;
    onChangeTab: (tab: FavoritesTab) => void;
    sortOrder: SortOrder;
    onToggleSort: () => void;
    styles: ReturnType<typeof createStyles>;
    primaryColor: string;
}) {
    return (
        <View style={styles.tabsWrapper}>
            <View style={styles.tabsContainer}>
                {TABS.map((tab, index) => {
                    const isActive = activeTab === tab;
                    return (
                        <View key={tab} style={styles.tabWrapper}>
                            <Pressable
                                onPress={() => onChangeTab(tab)}
                                style={[styles.tab, isActive && styles.activeTab]}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        isActive && styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </Pressable>
                            {index < TABS.length - 1 && (
                                <View style={styles.tabSeparator} />
                            )}
                        </View>
                    );
                })}
            </View>

            <Pressable onPress={onToggleSort} style={styles.sortButton} hitSlop={8}>
                <Text style={styles.sortText}>
                    {sortOrder === 'soonest' ? 'Prazo próximo' : 'Prazo distante'}
                </Text>
                <Feather
                    name={sortOrder === 'soonest' ? 'arrow-up' : 'arrow-down'}
                    size={14}
                    color={primaryColor}
                />
            </Pressable>
        </View>
    );
});

const SectionHeader = memo(function SectionHeader({
    title,
    styles,
}: {
    title: string;
    styles: ReturnType<typeof createStyles>;
}) {
    return <Text style={styles.sectionHeader}>{title}</Text>;
});

export default function PainelScreen() {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { favorites, isLoading, error, activeTab, setActiveTab, reload } = useFavorites();
    const { notificationCount } = useNotifications();

    useFocusEffect(
        useCallback(() => {
            reload();
        }, [reload])
    );
    const [displayedMonth, setDisplayedMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [sortOrder, setSortOrder] = useState<SortOrder>('soonest');

    const today = useMemo(() => startOfDay(new Date()), []);
    const displayedYear = displayedMonth.getFullYear();
    const displayedMonthIdx = displayedMonth.getMonth();

    const closingByOpp = useMemo(() => {
        const map = new Map<string, Date>();
        for (const opp of favorites) {
            const days = Number(opp.daysRemaining ?? 0);
            map.set(opp.id, startOfDay(addDays(today, days)));
        }
        return map;
    }, [favorites, today]);

    const markedDates = useMemo(() => {
        const map = new Map<string, MarkType>();
        for (const opp of favorites) {
            const d = closingByOpp.get(opp.id);
            if (!d) continue;
            if (d.getFullYear() !== displayedYear || d.getMonth() !== displayedMonthIdx) continue;
            const key = toDayKey(d);
            const mark: MarkType = d < today ? 'past' : 'future';
            const existing = map.get(key);
            if (existing === 'future' || mark === 'future') {
                map.set(key, 'future');
            } else {
                map.set(key, mark);
            }
        }
        return map;
    }, [favorites, closingByOpp, displayedYear, displayedMonthIdx, today]);

    const sections = useMemo(() => {
        const filtered = favorites.filter((opp) => {
            const d = closingByOpp.get(opp.id);
            if (!d) return false;
            if (d.getFullYear() !== displayedYear || d.getMonth() !== displayedMonthIdx) {
                return false;
            }
            const isPast = d < today;
            return activeTab === 'Em andamento' ? !isPast : isPast;
        });

        const groups = new Map<string, Opportunity[]>();
        for (const opp of filtered) {
            const d = closingByOpp.get(opp.id)!;
            const key = toDayKey(d);
            const arr = groups.get(key) ?? [];
            arr.push(opp);
            groups.set(key, arr);
        }

        return Array.from(groups.entries())
            .sort((a, b) => {
                if (a[0] === b[0]) return 0;
                if (sortOrder === 'soonest') return a[0] < b[0] ? -1 : 1;
                return a[0] < b[0] ? 1 : -1;
            })
            .map(([key, data]) => ({ title: formatSectionTitle(key), data }));
    }, [favorites, closingByOpp, displayedYear, displayedMonthIdx, today, activeTab, sortOrder]);

    const handlePrevMonth = useCallback(
        () => setDisplayedMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)),
        []
    );
    const handleNextMonth = useCallback(
        () => setDisplayedMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)),
        []
    );
    const handleToggleSort = useCallback(
        () => setSortOrder((prev) => (prev === 'soonest' ? 'latest' : 'soonest')),
        []
    );
    const handleChangeTab = useCallback(
        (tab: FavoritesTab) => setActiveTab(tab),
        [setActiveTab]
    );

    const listHeader = useMemo(
        () => (
            <>
                <FavoritesCalendar
                    month={displayedMonth}
                    markedDates={markedDates}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
                <TabsAndSort
                    activeTab={activeTab}
                    onChangeTab={handleChangeTab}
                    sortOrder={sortOrder}
                    onToggleSort={handleToggleSort}
                    styles={styles}
                    primaryColor={theme.colors.primary.main}
                />
                {isLoading && (
                    <ActivityIndicator style={styles.feedback} size="large" color={theme.colors.primary.main} />
                )}
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {!isLoading && !error && sections.length === 0 && (
                    <Text style={styles.emptyState}>
                        {favorites.length === 0
                            ? 'Você ainda não favoritou nenhum edital.'
                            : 'Nenhum edital neste filtro para o mês selecionado.'}
                    </Text>
                )}
            </>
        ),
        [
            displayedMonth,
            markedDates,
            handlePrevMonth,
            handleNextMonth,
            activeTab,
            handleChangeTab,
            sortOrder,
            handleToggleSort,
            isLoading,
            error,
            sections.length,
            favorites.length,
            styles,
            theme.colors.primary.main,
        ]
    );

    const renderItem = useCallback(
        ({ item }: { item: Opportunity }) => (
            <FavoriteCard
                title={item.title}
                company={item.company}
                location={item.location}
                value={formatCurrency(item.estimatedValue)}
                status={activeTab === 'Em andamento' ? 'em_andamento' : 'encerrado'}
            />
        ),
        [activeTab]
    );

    const renderSectionHeader = useCallback(
        ({ section }: { section: { title: string } }) => (
            <SectionHeader title={section.title} styles={styles} />
        ),
        [styles]
    );

    const keyExtractor = useCallback((item: Opportunity) => item.id, []);

    return (
        <View style={styles.container}>
            <PainelHeader
                notificationCount={notificationCount}
                styles={styles}
                iconColor={theme.colors.text.primary}
            />

            <SectionList
                sections={sections}
                keyExtractor={keyExtractor}
                stickySectionHeadersEnabled={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={listHeader}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
            />
        </View>
    );
}
