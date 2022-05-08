import { createSlice } from '@reduxjs/toolkit';
import * as ls from 'local-storage'
import { constants } from '../../app/constantas';
import moment from 'moment';

export const appSettingsSline = createSlice({
  name: 'app-settings',
  initialState: {
    saveSiteData: ls.get(constants.SAVE_SITE)
  },
  reducers: {
    setSaveSite: (state, value) => {
      const model = {
        date: moment().format(),
        value: value.payload
      }
      ls.set(constants.SAVE_SITE, model);
      state.saveSiteData = model;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSaveSite } = appSettingsSline.actions

export default appSettingsSline.reducer