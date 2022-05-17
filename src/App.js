import React from 'react';
import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux'
import store from './app/store'

import DownloadOfflineWidget from './components/download-offline-widget/DownloadOfflineWidget'
import OfflineWidgetPusher from './components/offline-widget-pusher/OfflineWidgetPusher'
import OfflineNotificationDialog from './components/dialogs/OfflineNotificationDialog'
import OfflineManagingDialog from './components/dialogs/OfflineManagingDialog';
import NotificationSnackbars from './components/notification-snack/NotificationSnackBar'
import OfflineWidget from './components/offline-widget/OfflineWidget';
import DownloadSpinnerWidget from './components/spinner-widget/DownloadSpinnerWidget';
import {DisableLint} from './components/strange-code/search-handler'; // subscribed to search box

function App() {
  return (
    <Provider store={store}>
      <DownloadOfflineWidget/>
      <OfflineWidget/>
      <NotificationSnackbars/>
      <OfflineNotificationDialog/>
      <OfflineManagingDialog/>
      <OfflineWidgetPusher/>
      <DownloadSpinnerWidget/>
      <DisableLint/>
      </Provider>
  );
}
 
export default hot(module)(App);