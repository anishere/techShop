import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchProd: (state, action) => {
      state.search = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProd } = searchSlice.actions

export default searchSlice.reducer