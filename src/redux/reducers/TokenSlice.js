import { createSlice } from '@reduxjs/toolkit'

export const TokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: JSON.parse(localStorage.getItem("token"))
  },
  reducers: {
    addtoken:(state,action)=>{
        state.value=JSON.parse(localStorage.getItem("token"))
    }
  }
})


export const { addtoken } = TokenSlice.actions

export default TokenSlice.reducer