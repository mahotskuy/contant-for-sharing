import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp';
import Badge from '@mui/material/Badge';
import './NotificationWidget.css';

import { useSelector, useDispatch } from 'react-redux'
import { setDialog } from '../../features/dialogs/dialogs-slice'
import * as constants from '../../app/constantas';

export default function NotificationWidget() {
    const dispatch = useDispatch();
    const notificationsCount = useSelector((state) => state.notification.notificationCount);

    const handleClickOpen = () => {
        dispatch(setDialog({
            dialogName: constants.dialogs.OFFLINE_NOTIFICATION,
            show: true
        }));
    };

    return (
        <div>
            {notificationsCount > 0 &&
                <IconButton
                    color="primary"
                    className='notification-widget fixed-icon'
                    component="span"
                    onClick={handleClickOpen}>
                    <Badge badgeContent={notificationsCount} color="secondary">
                        <CircleNotificationsSharpIcon
                            sx={{ fontSize: 40 }} />
                    </Badge>
                </IconButton>
            }
        </div>
    );
}
