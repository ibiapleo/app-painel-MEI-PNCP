import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useOpportunities } from '@/hooks/useOpportunities';
import type { FilterTab } from '@/stores/opportunities/types';

const tabs: FilterTab[] = ['Pra você', 'Região', 'Valor', 'Prazo'];

export function FilterTabs() {
    const { activeTab, changeTab } = useOpportunities();

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

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E4EA',
    },
    container: {
        height: 38,
        backgroundColor: '#F5F6FA',
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
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: '#777A83',
        fontSize: 12,
        fontWeight: '700',
    },
    activeText: {
        color: '#202124',
    },
    separator: {
        width: 1,
        height: 14,
        backgroundColor: '#C9CDD5',
    },
});