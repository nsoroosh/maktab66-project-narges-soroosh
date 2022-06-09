import { createSlice } from '@reduxjs/toolkit'

export const ServerData = createSlice({
  name: 'subcategorydata',
  initialState: {
    value:  [
      {
        "id": 1,
        "name": "گرافیک ارت",
        "categoryId": "1",
        "createdAt": 1643375019984
      },
      {
        "id": 2,
        "name": "ایلاستریتور",
        "categoryId": "1",
        "createdAt": 1643375019984
      },
      {
        "id": 3,
        "name": "ابستره",
        "categoryId": "1",
        "createdAt": 1643375019984
      },
      {
        "id": 4,
        "name": "سیاه و سفید ",
        "categoryId": "1",
        "createdAt": 1643375019984
      }
    ]
  },
  reducers: {
    getdata:(state,action)=>{
        state.value=action.payload
    }
  }
})


export const { getdata } = ServerData.actions

export default ServerData.reducer