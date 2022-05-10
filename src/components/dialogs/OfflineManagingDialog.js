import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


import * as constants from '../../app/constantas'

import { setDialog } from '../../features/dialogs/dialogs-slice'
import { useSelector, useDispatch } from 'react-redux'
import { setSaveSite, setOfflineLoading } from '../../features/settings/app-settings-slice'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OfflineManagingDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.dialogs.dialogs[constants.dialogs.OFFLINE_MANAGING]) ?? false;

    function handleCancelResponse() {
        navigator.serviceWorker.ready.then(sw => sw.active.postMessage({
            action: 'disable-offline',
        }));
        
        dispatch(setSaveSite({
            value: false
        }));
    }

    const handleClose = () => {
        dispatch(setDialog({
            dialogName: constants.dialogs.OFFLINE_MANAGING,
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
            <DialogTitle>{"Версія Оффлайн"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Ви можете користуватись сайтом без доступу до інтернету.
                    Для цього ми завантажили сайт у ваш браузер.
                    Якщо ви бажаєте відключити цю можливість то натисніть кнопку "Відключити".
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Закрити</Button>
                <Button onClick={handleCancelResponse}>Відключити</Button>
            </DialogActions>
        </Dialog>
    );
}
