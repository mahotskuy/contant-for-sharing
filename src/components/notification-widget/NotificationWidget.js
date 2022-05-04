import * as React from 'react';
import moment, { duration } from 'moment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp';
import Badge from '@mui/material/Badge';
import './NotificationWidget.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as ls from "local-storage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationWidget() {
    const [open, setOpen] = React.useState(false);
    const [badgeCount, setBadgeCount] = React.useState(0);

    function handleSaveSiteResponse(value) {
        if (value) {
            navigator.serviceWorker.ready.then(sw => sw.active.postMessage({
                action: 'enable-offline',
            }));
        }
        ls.set("SaveSite", {
            value: value,
            date: moment()
        })
        setOpen(false);
    }

    function pushNotification() {
        navigator.serviceWorker.ready.then(() => setBadgeCount(1));
    }

    function shouldPushNotification() {
        const saveSiteData = ls.get("SaveSite");
        const passedTime = duration(moment() - moment(saveSiteData?.date)).days();
        const outOfTime = passedTime > 7;
        const serviceWorkerRegistered = 'serviceWorker' in navigator;
        return (!saveSiteData || (!saveSiteData.value && outOfTime)) && serviceWorkerRegistered;
    }
    React.useEffect(
        () => {
            if (!shouldPushNotification()) return;

            const delaySeconds = 5;
            let timer = setTimeout(() => pushNotification(), delaySeconds * 1000);

            // this will clear Timeout
            // when component unmount like in willComponentUnmount
            // and show will not change to true
            return () => {
                clearTimeout(timer);
            };
        },
        // useEffect will run only one time with empty []
        // if you pass a value to array,
        // like this - [data]
        // than clearTimeout will run every time
        // this value changes (useEffect re-run)
        []
    );

    const handleClickOpen = () => {
        setBadgeCount(0);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {badgeCount > 0 &&
                <IconButton
                    color="primary"
                    className='notification-widget fixed-icon'
                    component="span"
                    size='large'
                    onClick={handleClickOpen}>
                    <Badge badgeContent={badgeCount} color="secondary">
                        <CircleNotificationsSharpIcon fontSize="large" />
                    </Badge>
                </IconButton>
            }
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
                        Якщо ви бажаєте мати доступ до сайту навіть без інтернету, то нажміть кнопку "Так".
                        У цьому випадку ми збережемо контент сайту на вашому телефоні і ви зможете користуватись
                        сайтом у випадках, коли у вас немає зв'язку.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSaveSiteResponse(false)}>Ні</Button>
                    <Button onClick={() => handleSaveSiteResponse(true)}>Так</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
