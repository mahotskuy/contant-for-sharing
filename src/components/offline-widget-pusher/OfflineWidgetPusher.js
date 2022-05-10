import * as React from 'react';
import moment, { duration } from 'moment';

import { useDispatch, useSelector } from 'react-redux'
import { pushNotification } from '../../features/notification/notification-slice';
import { setOfflineLoading } from '../../features/settings/app-settings-slice'

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

    React.useEffect(() => {
        const broadcast = new BroadcastChannel('offline-download');
        broadcast.onmessage = (event) => {
            switch (event.data.status) {
                case 'start':
                    dispatch(setOfflineLoading(true));
                    break;
                case 'downloading':
                    dispatch(setOfflineLoading(true));
                    break;
                case 'done':
                    dispatch(setOfflineLoading(false));
                    break;
                default:
                    break;
            }
        };

        return () => {
            broadcast.close();
        }
    }, [dispatch]);

    return (
        <span />
    );
}
