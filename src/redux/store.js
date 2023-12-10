import { configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice'
import authSlice from './authSlice'
import searchSlice from './searchSlice'

export const store = configureStore({
  reducer: {
    prod: detailSlice,
    auth: authSlice,
    search: searchSlice,
  },
})