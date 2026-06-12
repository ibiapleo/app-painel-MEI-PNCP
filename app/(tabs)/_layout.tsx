import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

import ProfileIcon from '@/components/icons/ProfileIcon';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export default function TabsLayout() {
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
                tabBarActiveTintColor: '#0877FF',
                tabBarInactiveTintColor: '#C4C7CF',
                tabBarStyle: {
                    height: 82,
                    paddingTop: 8,
                    paddingBottom: 12,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#F0F1F4',
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