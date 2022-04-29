import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp';
import './NotificationWidget.css';

export default function NotificationWidget() {
    return (
        <IconButton color="primary" className='notification-widget fixed-icon' component="span" size='large'>
            <CircleNotificationsSharpIcon fontSize="large"/>
        </IconButton>
    );
}
