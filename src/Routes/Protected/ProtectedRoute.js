import React from "react";
import { Navigate, Route } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
function ProtectedRoute({ children }) {
  // const { authenticate } = AuthUser();
  // const location = useLocation();
  const authenticate = useSelector(state => state.token.value)
  console.log(authenticate)
  return authenticate  ? (
    children
  ) : (
    <Navigate to="/login" replace  />
  )
}
export default ProtectedRoute