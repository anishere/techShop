import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: false,
}

export const authSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    UpInfoProd: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    SetAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { UpInfoProd, SetAuth } = authSlice.actions

export default authSlice.reducer