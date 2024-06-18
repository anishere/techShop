import { configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice'
import authSlice from './authSlice'
import searchSlice from './searchSlice'
import compareSlice from './compareSlice'

export const store = configureStore({
  reducer: {
    prod: detailSlice,
    auth: authSlice,
    search: searchSlice,
    compare: compareSlice,
  },
})