import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

import ProfileIcon from '@/components/icons/ProfileIcon';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export default function TabsLayout() {
    const theme = useTheme();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/(auth)/login');
        }
    }, [isAuthenticated, router]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.tabBar.active,
                tabBarInactiveTintColor: theme.colors.tabBar.inactive,
                tabBarStyle: {
                    height: 82,
                    paddingTop: 8,
                    paddingBottom: 12,
                    backgroundColor: theme.colors.tabBar.background,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.tabBar.border,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'compass' : 'compass-outline'}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="painel"
                options={{
                    title: 'Painel',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'grid' : 'grid-outline'}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <ProfileIcon color={color} size={22} />
                    ),
                }}
            />
        </Tabs>
    );
}