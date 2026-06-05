import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tokens } from "@/theme";

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
      return tokens.colors.primary["500"];
    }
    return tokens.colors.neutral["700"];
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
        color={tokens.colors.neutral["400"]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: tokens.colors.neutral["100"],
    borderRadius: 12,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.colors.neutral["200"],
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: tokens.typography.fontSize.bodyL,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.text.primary,
    lineHeight: 22,
  },
  description: {
    fontSize: tokens.typography.fontSize.bodyM,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.text.secondary,
    lineHeight: 20,
  },
  date: {
    fontSize: tokens.typography.fontSize.bodyS,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.neutral["400"],
    marginTop: 4,
  },
});