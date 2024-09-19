import { Navigate } from "react-router-dom";

const isAuthenticated = () => {

  return localStorage.getItem("token") !== null;
};


export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};