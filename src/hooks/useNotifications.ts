import { useEffect, useState } from 'react';

export function useNotifications() {
    const [notificationCount, setNotificationCount] = useState(9);

    useEffect(() => {
        // Futuramente:
        // buscarNotificationCount();
    }, []);

    return {
        notificationCount,
    };
}