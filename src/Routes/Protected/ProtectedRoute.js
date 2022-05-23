import React from "react";
import { Navigate, Route } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import { useEffect , useState } from "react";
function ProtectedRoute({ children }) {
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
    children
  ) : (
    <Navigate to="/login" replace  />
  )
}
export default ProtectedRoute