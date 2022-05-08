import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { popNotification } from '../../features/notification/snack-notification-slice';

import './NotificationSnackBar.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NotificationSnackbars() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.snackBarNotification.notifications)
  const open = notifications.length === 1;

  const notification = notifications[0];

  React.useEffect(()=>{
    if(notifications.length > 1){
      dispatch(popNotification());
    }
  }, [notifications, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(popNotification());
  };

  return (
    <span>
      {open === true &&
        <Snackbar
          key={new Date().getTime()}
          open={open} autoHideDuration={6000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      }
    </span>
  );
}
