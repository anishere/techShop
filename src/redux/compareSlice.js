import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id1: null,
    id2: null,
}

export const compareSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    HandleCompare1: (state, action) => {
        state.id1 = action.payload;
    },
    HandleCompare2: (state, action) => {
        state.id2 = action.payload;
    },
    HandleClearCompare: (state) => {
        state.id1 = null;
        state.id2 = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { HandleCompare1, HandleCompare2, HandleClearCompare } = compareSlice.actions

export default compareSlice.reducer