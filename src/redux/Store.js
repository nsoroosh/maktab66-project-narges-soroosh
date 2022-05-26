import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from './reducers/TokenSlice'
import  subcategorydataReducer  from './reducers/Subcategory'
import EdititemReducer from './reducers/Edititem'
import stockedititemReducer from './reducers/stockeditItem'
import newstockvalueReducer from './reducers/newstockValue'
import category1Reducer from "./reducers/Category1"
export default configureStore({
  reducer: {
      token:TokenReducer,
      subcategorydata:subcategorydataReducer,
      edititem:EdititemReducer,
      stockedititem:stockedititemReducer,
      newstockvalue:newstockvalueReducer,
      categories:category1Reducer
  }
})