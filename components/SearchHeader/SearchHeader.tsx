import { Feather, Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

interface SearchHeaderProps {
    notificationCount: number;
}

export function SearchHeader({ notificationCount }: SearchHeaderProps) {
    const hasNotifications = notificationCount > 0;

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Feather name="search" size={22} color="#202124" />

                <Feather name="sliders" size={18} color="#202124" />
            </View>

            <Feather name="heart" size={28} color="#202124" />

            <View style={styles.notificationWrapper}>
                <Ionicons name="notifications-outline" size={27} color="#202124" />

                {hasNotifications && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 44,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
    },
    searchBox: {
        flex: 1,
        height: 42,
        backgroundColor: '#F5F6FA',
        borderRadius: 22,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        backgroundColor: '#0877FF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },
});