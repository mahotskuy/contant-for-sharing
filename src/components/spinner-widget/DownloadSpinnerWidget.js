import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './DownloadSpinnerWidget.css';

import { useSelector } from 'react-redux'

export default function DownloadSpinnerWidget() {
    const isComponentLoading = useSelector((state) => state.settings.offlineLoading);

    return (
        <div>
            {isComponentLoading && <CircularProgress className='download-spinner fixed-icon'/>}
        </div>
    );
}
