import { configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice'
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    prod: detailSlice,
    auth: authSlice,
  },
})