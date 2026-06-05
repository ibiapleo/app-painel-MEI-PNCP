import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

import NotificationCard, { Notification } from "@/components/NotificationCard/NotificationCard";
import { tokens } from '@/theme';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novos editais compatíveis disponíveis!',
    description: 'Veja agora diversos editais compatíveis com seu perfil, aproveite!',
    date: 'Hoje, 14:30',
    isRead: false,
    type: 'edital'
  },
  {
    id: '2',
    title: 'Um edital que você acompanha finalizou',
    description: 'Confira o seu calendário para visualizar os prazos de editais que você acompanha.',
    date: 'Ontem, 09:15',
    isRead: false,
    type: 'finalizado'
  },
  {
    id: '3',
    title: 'Novos editais compatíveis disponíveis!',
    description: 'Veja agora diversos editais compatíveis com seu perfil, aproveite!',
    date: '02/04/2026',
    isRead: true,
    type: 'edital'
  },
  {
    id: '4',
    title: 'Um edital que você acompanha finalizou',
    description: 'Confira o seu calendário para visualizar os prazos de editais que você acompanha.',
    date: '02/05/2026',
    isRead: true,
    type: 'finalizado'
  },
  {
    id: '5',
    title: 'Atualização no sistema',
    description: 'Novas funcionalidades disponíveis para melhorar sua experiência.',
    date: '30/05/2026',
    isRead: true,
    type: 'info'
  }
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const getCurrentNotifications = () => {
    return activeTab === 'unread' ? unreadNotifications : readNotifications;
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off-outline" size={48} color={tokens.colors.neutral["400"]} />
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={tokens.colors.primary["500"]} />
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
                notification={notification}
                onPress={handleNotificationPress}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: tokens.typography.fontSize.h2,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.primary,
  },
  markAllText: {
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.primary["500"],
  },
  tabsWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.neutral["200"],
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
    backgroundColor: '#FFFFFF',
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
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.neutral["700"],
  },
  activeTabText: {
    color: tokens.colors.primary["500"],
    fontWeight: tokens.typography.fontWeight.semiBold,
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
    backgroundColor: tokens.colors.neutral["100"],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: tokens.typography.fontSize.h3,
    fontWeight: tokens.typography.fontWeight.semiBold,
    color: tokens.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});