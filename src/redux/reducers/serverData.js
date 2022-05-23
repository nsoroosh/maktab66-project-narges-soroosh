import { createSlice } from '@reduxjs/toolkit'

export const ServerData = createSlice({
  name: 'subcategorydata',
  initialState: {
    value: ["ابستره" ,"گرافیک ارت","ایلاستریتور","سیاه و سفید "]
  },
  reducers: {
    getdata:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { getdata } = ServerData.actions

export default ServerData.reducer