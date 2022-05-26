import { createSlice } from '@reduxjs/toolkit'

export const Category = createSlice({
  name: 'categories',
  initialState: {
    value: ["دیجیتال ارت","نقاشی","عکس","تایپوگرافی"]
  },
  reducers: {
    addcategorydata:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { addcategorydata } = Category.actions

export default Category.reducer