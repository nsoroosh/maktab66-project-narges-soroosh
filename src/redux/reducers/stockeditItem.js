import { createSlice } from '@reduxjs/toolkit'

export const stockditItem = createSlice({
  name: 'stockitem',
  initialState: {
    value: []
  },
  reducers: {
    stockedititem:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { stockedititem } = stockditItem.actions

export default stockditItem.reducer