import { createSlice } from '@reduxjs/toolkit'

export const snackBarNotificationSlice = createSlice({
  name: 'snackbar-notification',
  initialState: {
    notifications: []
  },
  reducers: {
    pushNotification: (state, value) => {
      state.notifications.unshift(value.payload)
    },
    popNotification: (state) => {
      state.notifications.pop();
    }
  },
})

// Action creators are generated for each case reducer function
export const { pushNotification, popNotification } = snackBarNotificationSlice.actions

export default snackBarNotificationSlice.reducer