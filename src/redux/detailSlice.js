import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  type: null,
}

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    UpInfoProd: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
  },
})

// Action creators are generated for each case reducer function
export const { UpInfoProd } = detailSlice.actions

export default detailSlice.reducer