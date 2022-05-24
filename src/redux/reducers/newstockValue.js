import { createSlice } from '@reduxjs/toolkit'

export const Newstockvalue = createSlice({
  name: 'newstockvalue',
  initialState: {
    value: 0
  },
  reducers: {
    
    addnewstockvalue: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {  addnewstockvalue } = Newstockvalue.actions

export default Newstockvalue.reducer