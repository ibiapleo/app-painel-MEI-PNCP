import { useEffect } from 'react';

import { useNotificationsStore } from '@/stores/notifications/useNotificationsStore';

export function useNotifications() {
  const notificationCount = useNotificationsStore((state) => state.count);
  const isLoading = useNotificationsStore((state) => state.isLoading);
  const fetchCount = useNotificationsStore((state) => state.fetchCount);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return {
    notificationCount,
    isLoading,
  };
}
