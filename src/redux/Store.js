import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from './reducers/TokenSlice'
import  ServerDataReducer  from './reducers/serverData'
import LoadProductdata from './reducers/LoadProductdata'
export default configureStore({
  reducer: {
      token:TokenReducer,
      data:ServerDataReducer,
      loadproductdata:LoadProductdata
  }
})