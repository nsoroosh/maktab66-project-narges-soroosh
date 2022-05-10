import { Navigate, Outlet } from 'react-router-dom';


function PrivateRoutes({ children }) {
    // const { authenticate } = AuthUser();
    // const location = useLocation();
    const authenticate = false
  
    return authenticate  ? (
      children
    ) : (
      <Navigate to="/login" replace  />
    )
  }
  export default PrivateRoutes