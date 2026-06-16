import { useMemo } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks/useTheme';
import type { Notification } from '@/components/NotificationCard/NotificationCard';

interface NotificationDetailModalProps {
  visible: boolean;
  notification: Notification | null;
  onClose: () => void;
}

export default function NotificationDetailModal({
  visible,
  notification,
  onClose,
}: NotificationDetailModalProps) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(58, 61, 64, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        },
        card: {
          backgroundColor: theme.colors.background.surface,
          borderRadius: 24,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          width: '100%',
          maxWidth: 340,
          maxHeight: '70%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
          marginBottom: 16,
        },
        iconContainer: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.primary.muted,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerText: {
          flex: 1,
          gap: 4,
        },
        title: {
          fontSize: 17,
          fontWeight: '700',
          color: theme.colors.text.primary,
          lineHeight: 22,
        },
        date: {
          fontSize: 12,
          color: theme.colors.text.secondary,
        },
        message: {
          fontSize: 15,
          lineHeight: 22,
          color: theme.colors.text.secondary,
        },
        closeButton: {
          marginTop: 20,
          height: 48,
          backgroundColor: theme.colors.primary.main,
          borderRadius: 14,
          justifyContent: 'center',
          alignItems: 'center',
        },
        closeButtonText: {
          color: theme.colors.text.onPrimary,
          fontSize: 16,
          fontWeight: '600',
        },
      }),
    [theme],
  );

  const getIconName = () => {
    switch (notification?.type) {
      case 'edital':
        return 'document-text-outline';
      case 'finalizado':
        return 'checkmark-circle-outline';
      default:
        return 'information-circle-outline';
    }
  };

  if (!notification) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={getIconName()}
                size={22}
                color={theme.colors.primary.main}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>{notification.title}</Text>
              <Text style={styles.date}>{notification.date}</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.message}>{notification.description}</Text>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
