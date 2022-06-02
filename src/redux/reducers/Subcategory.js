import { createSlice } from '@reduxjs/toolkit'

export const ServerData = createSlice({
  name: 'subcategorydata',
  initialState: {
    value: ["سیاه و سفید ","ابستره" ,"ایلاستریتور","گرافیک ارت"]
  },
  reducers: {
    getdata:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { getdata } = ServerData.actions

export default ServerData.reducer