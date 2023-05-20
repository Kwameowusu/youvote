// import { useContext } from "react";

import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthProvider } from "../contextapi/AuthProvider";


const ProtectedRoute = () => {
  const { AuthState } = useAuthProvider();


  const location = useLocation();

  if (!AuthState.credentials || AuthState.credentials === null) {
    
    return <Navigate replace to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
