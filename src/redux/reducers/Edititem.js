import { createSlice } from '@reduxjs/toolkit'

export const Edititem = createSlice({
  name: 'Edititem',
  initialState: {
    value: []
  },
  reducers: {
    edititem:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { edititem } = Edititem.actions

export default Edititem.reducer