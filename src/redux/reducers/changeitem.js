import { createSlice } from '@reduxjs/toolkit'

export const ChangeItem = createSlice({
  name: 'changeitem',
  initialState: {
    value: []
  },
  reducers: {
    changeitem:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { changeitem } = ChangeItem.actions

export default ChangeItem.reducer