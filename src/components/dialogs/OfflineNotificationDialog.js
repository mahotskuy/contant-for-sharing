import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useSelector, useDispatch } from 'react-redux'
import { dialogs } from '../../app/constantas';
import { setDialog } from '../../features/dialogs/dialogs-slice'
import { popNotification } from '../../features/notification/notification-slice'
import { setSaveSite } from '../../features/settings/app-settings-slice'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OfflineNotificationDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.dialogs.dialogs[dialogs.OFFLINE_NOTIFICATION]) ?? false;

    function handleSaveSiteResponse(value) {
        if (value) {
            navigator.serviceWorker.ready.then(sw => sw.active.postMessage({
                action: 'enable-offline',
            }));
        }

        dispatch(setSaveSite(value));
        dispatch(setDialog({
            dialogName: dialogs.OFFLINE_NOTIFICATION,
            show: false
        }));
        dispatch(popNotification());
    }

    const handleClose = () => {
        dispatch(setDialog({
            dialogName: dialogs.OFFLINE_NOTIFICATION,
            show: false
        }));
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Бажаєте мати доступ до сайту навіть без інтернету?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Якщо ви бажаєте мати доступ до сайту, навіть, без інтернету, то натисніть кнопку "Так".
                    У цьому випадку, ми збережемо контент сайту на вашому телефоні і ви зможете користуватись
                    сайтом у випадках, коли у вас немає зв'язку. Контент займає приблизно 160 Mb.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSaveSiteResponse(false)}>Ні</Button>
                <Button onClick={() => handleSaveSiteResponse(true)}>Так</Button>
            </DialogActions>
        </Dialog>
    );
}
