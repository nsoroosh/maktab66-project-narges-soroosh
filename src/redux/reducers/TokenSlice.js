import { createSlice } from '@reduxjs/toolkit'

export const TokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: 0
  },
  reducers: {
    addtoken:(state,token)=>{
        state.value=token
    }
  }
})


export const { addtoken } = TokenSlice.actions

export default TokenSlice.reducer