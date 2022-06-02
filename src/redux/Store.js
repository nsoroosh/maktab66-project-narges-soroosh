import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from './reducers/TokenSlice'
import  subcategorydataReducer  from './reducers/Subcategory'
import EdititemReducer from './reducers/Edititem'
import category1Reducer from "./reducers/Category1"
import ChangeItemReducer from './reducers/changeitem'
export default configureStore({
  reducer: {
      token:TokenReducer,
      subcategorydata:subcategorydataReducer,
      edititem:EdititemReducer,
      categories:category1Reducer,
      changeitem:ChangeItemReducer
  }
})