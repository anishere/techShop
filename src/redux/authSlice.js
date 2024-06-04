import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    idTaiKhoan: -1,
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
    },
    SetIdTaiKhoan: (state, action) => {
      state.idTaiKhoan = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { UpInfoProd, SetAuth, SetIdTaiKhoan } = authSlice.actions

export default authSlice.reducer