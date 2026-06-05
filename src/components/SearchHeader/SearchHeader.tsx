import { Feather, Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

interface SearchHeaderProps {
    notificationCount: number;
    onSearch?: (text: string) => void;
}

export function SearchHeader({ notificationCount, onSearch }: SearchHeaderProps) {
    const router = useRouter();
    const hasNotifications = notificationCount > 0;

    const handleNotificationPress = () => {
        router.push('/notifications');
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Feather name="search" size={22} color="#202124" />
                
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Pesquisar editais..."
                    placeholderTextColor="#A0A0A5"
                    onChangeText={onSearch}
                    returnKeyType="search"
                    autoCorrect={false}
                />

                <Feather name="sliders" size={18} color="#202124" />
            </View>

            <Feather name="heart" size={28} color="#202124" />

            <TouchableOpacity onPress={handleNotificationPress}>
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
            </TouchableOpacity>
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
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
        color: '#202124',
        padding: 0,
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