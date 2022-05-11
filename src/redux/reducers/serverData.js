import { createSlice } from '@reduxjs/toolkit'

export const ServerData = createSlice({
  name: 'productdata',
  initialState: {
    value: []
  },
  reducers: {
    getdata:(state,newdata)=>{
        state.value=newdata
    }
  }
})


export const { getdata } = ServerData.actions

export default ServerData.reducer