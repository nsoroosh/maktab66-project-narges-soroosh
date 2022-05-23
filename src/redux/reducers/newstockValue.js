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

export const {  incrementByAmount } = Newstockvalue.actions

export default Newstockvalue.reducer