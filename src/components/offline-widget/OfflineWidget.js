import * as React from 'react';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import { useDispatch, useSelector } from 'react-redux';
import { setDialog } from '../../features/dialogs/dialogs-slice'
import * as constants from '../../app/constantas';

import IconButton from '@mui/material/IconButton';

import './OfflineWidget.css';

export default function OfflineWidget() {
    const dispatch = useDispatch();

    const handleClick = function () {
        dispatch(setDialog({
            dialogName: constants.dialogs.OFFLINE_MANAGING,
            show: true
        }));
    }

    const saveSiteData = useSelector((state) => state.settings.saveSiteData);
    const isVisibable = saveSiteData?.value ?? false;
    return (
        <div>
            {isVisibable === true &&
                <IconButton
                    color="success"
                    className='offline-widget fixed-icon'
                    component="span"
                    size='large'
                    onClick={handleClick}>
                    <OfflinePinIcon fontSize="large" />
                </IconButton>
            }
        </div>
    );
}