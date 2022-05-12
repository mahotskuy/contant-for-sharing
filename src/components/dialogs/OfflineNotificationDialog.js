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
import { setSaveSite, setOfflineLoading } from '../../features/settings/app-settings-slice'

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
        dispatch(setOfflineLoading(true));
        dispatch(setDialog({
            dialogName: dialogs.OFFLINE_NOTIFICATION,
            show: false
        }));
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
                    Натисніть кнопку "Так" щоб зберегти контент сайту на вашому пристрої.
                    Після цього ви зможете користуватись сайтом у випадках, коли у вас немає зв'язку.
                    Під час завантаження можливі труднощі із користуванням сайту.
                    Контент займає приблизно 160 Mb.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрити</Button>
                <Button onClick={() => handleSaveSiteResponse(true)}>Так</Button>
            </DialogActions>
        </Dialog>
    );
}
