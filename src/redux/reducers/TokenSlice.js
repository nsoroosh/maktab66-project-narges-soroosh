import { createSlice } from '@reduxjs/toolkit'

export const TokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: false
  },
  reducers: {
    addtoken:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { addtoken } = TokenSlice.actions

export default TokenSlice.reducer