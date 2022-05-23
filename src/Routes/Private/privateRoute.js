import React from "react";
import { Navigate, Route } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import { useEffect , useState } from "react";
function PrivetRoute({ children }) {
  const authenticate = useSelector(state => state.token.value)
  const [login, setlogin] = useState(authenticate)
  // console.log(login)
  useEffect(() => {
    setlogin(authenticate)
    
  
    return () => {
      setlogin(authenticate)
    }
  }, [])
  
  return login  ? (
    <Navigate to="/admin" replace  />
  ) : (
   children
  )
}
export default PrivetRoute