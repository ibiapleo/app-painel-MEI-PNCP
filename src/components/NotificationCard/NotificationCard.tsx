import { useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  type: 'edital' | 'finalizado' | 'info';
}

interface NotificationCardProps {
  notification: Notification;
  onPress?: (notification: Notification) => void;
}

export default function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: theme.colors.background.muted,
          borderRadius: 12,
          gap: 12,
        },
        iconContainer: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: theme.colors.border.subtle,
          alignItems: 'center',
          justifyContent: 'center',
        },
        contentContainer: {
          flex: 1,
          gap: 4,
        },
        title: {
          fontSize: theme.typography.fontSize.bodyL,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.primary,
          lineHeight: 22,
        },
        description: {
          fontSize: theme.typography.fontSize.bodyM,
          fontWeight: theme.typography.fontWeight.regular,
          color: theme.colors.text.secondary,
          lineHeight: 20,
        },
        date: {
          fontSize: theme.typography.fontSize.bodyS,
          fontWeight: theme.typography.fontWeight.regular,
          color: theme.colors.text.secondary,
          marginTop: 4,
        },
      }),
    [theme],
  );

  const getIconName = () => {
    switch (notification.type) {
      case 'edital':
        return 'document-text-outline';
      case 'finalizado':
        return 'checkmark-circle-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getIconColor = () => {
    if (!notification.isRead) {
      return theme.colors.primary.main;
    }
    return theme.colors.text.secondary;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName()}
          size={24}
          color={getIconColor()}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {notification.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {notification.description}
        </Text>

        <Text style={styles.date}>{notification.date}</Text>
      </View>

      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={theme.colors.text.secondary}
      />
    </TouchableOpacity>
  );
}
