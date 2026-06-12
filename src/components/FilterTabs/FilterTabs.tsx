import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useTheme } from '@/hooks/useTheme';
import type { FilterTab } from '@/stores/opportunities/types';

const tabs: FilterTab[] = ['Pra você', 'Região', 'Valor', 'Prazo'];

export function FilterTabs() {
    const theme = useTheme();
    const { activeTab, changeTab } = useOpportunities();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                wrapper: {
                    backgroundColor: theme.colors.background.surface,
                    paddingHorizontal: 24,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border.subtle,
                },
                container: {
                    height: 38,
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
                    height: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                activeTab: {
                    backgroundColor: theme.colors.background.surface,
                },
                text: {
                    color: theme.colors.text.secondary,
                    fontSize: 12,
                    fontWeight: '700',
                },
                activeText: {
                    color: theme.colors.text.primary,
                },
                separator: {
                    width: 1,
                    height: 14,
                    backgroundColor: theme.colors.border.default,
                },
            }),
        [theme],
    );

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab;

                    return (
                        <View key={tab} style={styles.tabWrapper}>
                            <Pressable
                                onPress={() => changeTab(tab)}
                                style={[styles.tab, isActive && styles.activeTab]}
                            >
                                <Text style={[styles.text, isActive && styles.activeText]}>
                                    {tab}
                                </Text>
                            </Pressable>

                            {index < tabs.length - 1 && <View style={styles.separator} />}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
