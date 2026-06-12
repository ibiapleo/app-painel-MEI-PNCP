import { useEffect, useRef } from 'react';
import { useNotificationStore } from '@/stores/notifications/useNotificationsStore';

export function useNotificationTimer(isLoggedIn: boolean) {
  const { addNotification } = useNotificationStore();
  const timerRef = useRef<NodeJS.Timeout | null | number>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (isLoggedIn) {
      console.log('[Notificação] Login detectado, agendando notificação em 15 segundos...');

      timerRef.current = setTimeout(() => {
        console.log('[Notificação] Timer disparado! Adicionando notificação...');

        addNotification({
          title: '📢 Novos editais disponíveis!',
          message: 'Confira os novos editais compatíveis com seu perfil de MEI. Não perca as oportunidades!',
        });

        timerRef.current = null;
      }, 15000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoggedIn, addNotification]);
}