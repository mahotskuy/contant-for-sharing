import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationCount: 0
  },
  reducers: {
    pushNotification: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.notificationCount += 1
    },
    popNotification: (state) => {
      state.notificationCount -= 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { pushNotification, popNotification } = notificationSlice.actions

export default notificationSlice.reducer