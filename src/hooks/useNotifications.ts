import { useEffect } from 'react';

import { useNotificationStore } from '@/stores/notifications/useNotificationsStore';

export function useNotifications() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const isLoading = false;
  const fetchCount = useNotificationStore((state) => state.unreadCount);

  return {
    notificationCount: unreadCount,
    isLoading,
    fetchCount,
    notifications,
  };
}