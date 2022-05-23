import { configureStore } from '@reduxjs/toolkit'
import TokenReducer from './reducers/TokenSlice'
import  subcategorydataReducer  from './reducers/serverData'
import EdititemReducer from './reducers/Edititem'
import stockedititemReducer from './reducers/stockeditItem'
import newstockvalueReducer from './reducers/newstockValue'
export default configureStore({
  reducer: {
      token:TokenReducer,
      data:subcategorydataReducer,
      edititem:EdititemReducer,
      stockedititem:stockedititemReducer,
      newstockvalue:newstockvalueReducer
  }
})