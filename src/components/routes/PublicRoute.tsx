import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../../utils";

const isAuthenticated = () => {
  return !!getLocalStorage("token") 
};


export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};