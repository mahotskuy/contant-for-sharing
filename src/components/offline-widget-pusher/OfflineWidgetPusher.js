import * as React from 'react';
import moment, { duration } from 'moment';

import { useDispatch, useSelector } from 'react-redux'
import { pushNotification } from '../../features/notification/notification-slice';
import { pushNotification as pushSnackNotification } from '../../features/notification/snack-notification-slice';

export default function OfflineWidgetPusher() {
    const dispatch = useDispatch();
    const saveSiteData = useSelector(state => state.settings.saveSiteData);

    function shouldPushNotification() {
        const passedTime = duration(moment() - moment(saveSiteData?.date)).days();
        const outOfTime = passedTime > 7;
        const serviceWorkerRegistered = 'serviceWorker' in navigator;
        return (!saveSiteData || (!saveSiteData.value && outOfTime)) && serviceWorkerRegistered;
    }

    React.useEffect(
        () => {
            if (!shouldPushNotification()) return;

            const delaySeconds = 5;
            let timer = setTimeout(() =>
                navigator.serviceWorker.ready.then(() => dispatch(pushNotification())), delaySeconds * 1000);

            // this will clear Timeout
            // when component unmount like in willComponentUnmount
            // and show will not change to true
            return () => {
                clearTimeout(timer);
            };
        }
    );

    const getMessage = eventMessage => {
        switch (eventMessage.status) {
            case 'start':
                return `Завантаження почалось`;
            case 'downloading':
                return "Завантаження продовжується";
            case 'done':
                return "Завантаження завершилось";
            default:
                break;
        }
    }

    React.useEffect(() => {
        const broadcast = new BroadcastChannel('offline-download');
        broadcast.onmessage = (event) => {
            if(!getMessage(event.data)) return;

            dispatch(pushSnackNotification(
                {
                    message: getMessage(event.data),
                    severity: 'info'
                }));
        };

        return () => {
            broadcast.close();
        }
    }, [dispatch]);

    return (
        <span />
    );
}
