import React from 'react';
import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux'
import store from './app/store'

import NotificationWidget from './components/notification-widget/NotificationWidget'
import OfflineWidgetPusher from './components/offline-widget-pusher/OfflineWidgetPusher'
import OfflineNotificationDialog from './components/dialogs/OfflineNotificationDialog'
import OfflineManagingDialog from './components/dialogs/OfflineManagingDialog';
import NotificationSnackbars from './components/notification-snack/NotificationSnackBar'
import OfflineWidget from './components/offline-widget/OfflineWidget';

function App() {
  return (
    <Provider store={store}>
      <NotificationWidget/>
      <OfflineWidget/>
      <NotificationSnackbars/>
      <OfflineNotificationDialog/>
      <OfflineManagingDialog/>
      <OfflineWidgetPusher/>
      </Provider>
  );
}
 
export default hot(module)(App);