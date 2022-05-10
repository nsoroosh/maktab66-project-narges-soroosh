import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from './reducers/TokenSlice'
export default configureStore({
  reducer: {
      token:TokenReducer
  }
})