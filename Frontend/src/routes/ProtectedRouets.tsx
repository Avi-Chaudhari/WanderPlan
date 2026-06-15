import { Navigate } from "react-router-dom";
import useAuth from "../context/authContext";

export default function ProtectedRoute({children}:any){
  const {token , loading} = useAuth();
  
  if(loading){
    return null;
  }
  if (!token) {
  return <Navigate to="/login" />;
}

  return children;
}