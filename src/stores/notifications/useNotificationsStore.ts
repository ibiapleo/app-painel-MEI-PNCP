import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  loadNotifications: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bem-vindo ao Painel MEI!',
    message: 'Explore os editais disponíveis e encontre oportunidades para seu negócio.',
    date: new Date().toISOString(),
    isRead: false,
  }
];

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.isRead).length,

  addNotification: ({ title, message }) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      date: new Date().toISOString(),
      isRead: false,
    };

    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id: string) => {
    set(state => {
      const updatedNotifications = state.notifications.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      );
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.isRead).length,
      };
    });
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },

  loadNotifications: () => {
    const savedNotifications = mockNotifications;
    set({
      notifications: savedNotifications,
      unreadCount: savedNotifications.filter(n => !n.isRead).length,
    });
  },
}));