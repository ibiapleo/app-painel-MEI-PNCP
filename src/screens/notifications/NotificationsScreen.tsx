import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

import NotificationCard, { Notification } from "@/components/NotificationCard/NotificationCard";
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/stores/theme/useThemeStore';
import NotificationCard from "@/components/NotificationCard/NotificationCard";
import { useNotificationStore } from "@/stores/notifications/useNotificationsStore";

export default function NotificationsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const mode = useThemeStore((state) => state.mode);
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');

  const { notifications, markAsRead } = useNotificationStore();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background.surface,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingTop: 44,
          paddingBottom: 12,
          backgroundColor: theme.colors.background.surface,
        },
        backButton: {
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerText: {
          fontSize: theme.typography.fontSize.h2,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
        },
        tabsWrapper: {
          paddingHorizontal: 24,
          paddingVertical: 12,
          backgroundColor: theme.colors.background.surface,
        },
        tabsContainer: {
          flexDirection: 'row',
          backgroundColor: theme.colors.background.muted,
          borderRadius: 40,
          padding: 4,
          gap: 4,
        },
        tab: {
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        activeTab: {
          backgroundColor: theme.colors.background.surface,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        },
        tabText: {
          fontSize: theme.typography.fontSize.bodyM,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.secondary,
        },
        activeTabText: {
          color: theme.colors.primary.main,
          fontWeight: theme.typography.fontWeight.semiBold,
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          flexGrow: 1,
        },
        emptyScrollContent: {
          flex: 1,
          justifyContent: 'center',
        },
        notificationsList: {
          flexDirection: 'column',
          gap: 12,
          paddingHorizontal: 24,
          paddingVertical: 12,
        },
        emptyContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 32,
          paddingVertical: 48,
        },
        emptyIconContainer: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.background.muted,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        },
        emptyTitle: {
          fontSize: theme.typography.fontSize.h3,
          fontWeight: theme.typography.fontWeight.semiBold,
          color: theme.colors.text.primary,
          marginBottom: 8,
          textAlign: 'center',
        },
        emptyDescription: {
          fontSize: theme.typography.fontSize.bodyM,
          fontWeight: theme.typography.fontWeight.regular,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          lineHeight: 20,
        },
      }),
    [theme],
  );

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const getCurrentNotifications = () => {
    return activeTab === 'unread' ? unreadNotifications : readNotifications;
  };

  const handleNotificationPress = (notification: any) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off-outline" size={48} color={theme.colors.text.secondary} />
      </View>
      <Text style={styles.emptyTitle}>Nada por aqui.</Text>
      <Text style={styles.emptyDescription}>
        {activeTab === 'unread'
          ? "Você não tem notificações não lidas no momento."
          : "Você ainda não tem notificações lidas."}
      </Text>
    </View>
  );

  const currentNotifications = getCurrentNotifications();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background.surface}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary.main} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notificações</Text>
      </View>

      <View style={styles.tabsWrapper}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'unread' && styles.activeTab
            ]}
            onPress={() => setActiveTab('unread')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'unread' && styles.activeTabText
            ]}>
              Não Lidas {unreadNotifications.length > 0 && `(${unreadNotifications.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'read' && styles.activeTab
            ]}
            onPress={() => setActiveTab('read')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'read' && styles.activeTabText
            ]}>
              Lidas {readNotifications.length > 0 && `(${readNotifications.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          currentNotifications.length === 0 && styles.emptyScrollContent
        ]}
      >
        {currentNotifications.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.notificationsList}>
            {currentNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={{
                  id: notification.id,
                  title: notification.title,
                  description: notification.message,
                  date: new Date(notification.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  isRead: notification.isRead,
                  type: 'info' // ou mapear baseado no tipo da notificação
                }}
                onPress={handleNotificationPress}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
