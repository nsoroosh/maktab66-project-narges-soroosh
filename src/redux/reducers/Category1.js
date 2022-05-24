import { createSlice } from '@reduxjs/toolkit'

export const Category1 = createSlice({
  name: 'category1',
  initialState: {
    value: []
  },
  reducers: {
    addcategorydata:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { addcategorydata } = Category1.actions

export default Category1.reducer