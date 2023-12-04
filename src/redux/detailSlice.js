import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  type: null,
  ids: {},
  totalPrice: 0,
}

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    UpInfoProd: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    addItem: (state, action) => {
      const productId = action.payload;
      if (state.ids[productId]) {
          state.ids[productId] += 1;
      } else {
          state.ids[productId] = 1;
      }
    },
    reduceItem: (state, action) => {
      const productId = action.payload
      state.ids[productId] -= 1
    },
    editQuantity: (state, action) => { 
      const id = action.payload.id
      const data = action.payload.data
      state.ids[id] = data
    },
    deleteItem: (state, action) => {
      const id = action.payload
      delete state.ids[id]
    },
    clearIds: (state) => {
      Object.keys(state.ids).forEach((key) => delete state.ids[key]);
    },
    putTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { UpInfoProd, addItem, reduceItem, editQuantity, deleteItem, clearIds, putTotalPrice } = detailSlice.actions

export default detailSlice.reducer