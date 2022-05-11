import { createSlice } from '@reduxjs/toolkit'

export const LoadProductdata = createSlice({
  name: 'loadproductdata',
  initialState: {
    value: true
  },
  reducers: {
    loaded:(state,input)=>{
        state.value=input
    }
  }
})


export const { loaded } = LoadProductdata.actions

export default LoadProductdata.reducer