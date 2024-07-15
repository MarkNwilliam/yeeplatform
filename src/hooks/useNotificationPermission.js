import { useEffect } from 'react';

const useNotificationPermission = () => {
  useEffect(() => {
    const permissionStatus = localStorage.getItem('notificationPermission');
    const nextAskDate = localStorage.getItem('nextAskDate');

    if (!permissionStatus || !nextAskDate || new Date() > new Date(nextAskDate)) {
      Notification.requestPermission().then((permission) => {
        localStorage.setItem('notificationPermission', permission);

        if (permission !== 'granted') {
          const nextAskDate = new Date();
          nextAskDate.setDate(nextAskDate.getDate() + 7);
          localStorage.setItem('nextAskDate', nextAskDate.toString());
        }
      });
    }
  }, []);
};

export default useNotificationPermission;
