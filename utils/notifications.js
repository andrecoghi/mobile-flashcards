import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

function createNotification() {
    return {
        title: 'We already miss you here!',
        body: "🎓 You still haven't study this week, push yourself because, no one else is going to do it for you!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let fireDate = new Date();
                            fireDate.setDate(fireDate.getDate() + 1);
                            fireDate.setHours(12);
                            fireDate.setMinutes(0);
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: fireDate,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}