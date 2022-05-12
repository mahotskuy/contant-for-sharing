import * as React from 'react';

import { useDispatch } from 'react-redux'
import { setOfflineLoading } from '../../features/settings/app-settings-slice'

export default function OfflineWidgetPusher() {
    const dispatch = useDispatch();

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
