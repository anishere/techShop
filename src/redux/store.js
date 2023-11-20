import { configureStore } from '@reduxjs/toolkit'
import detailSlice from './detailSlice'

export const store = configureStore({
  reducer: {
    prod: detailSlice,
  },
})