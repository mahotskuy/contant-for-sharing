import { createSlice } from '@reduxjs/toolkit'

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
    dialogs: {}
  },
  reducers: {
    setDialog: (state, value) => {
        state.dialogs[value.payload.dialogName] = value.payload.show;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDialog } = dialogsSlice.actions

export default dialogsSlice.reducer