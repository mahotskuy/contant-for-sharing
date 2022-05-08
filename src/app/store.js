import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notification-slice'
import snackBarNotificationReducer from '../features/notification/snack-notification-slice'
import dialogsReducer from '../features/dialogs/dialogs-slice'
import appSettingsReducer from '../features/settings/app-settings-slice'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    dialogs: dialogsReducer,
    snackBarNotification: snackBarNotificationReducer,
    settings: appSettingsReducer
  },
})