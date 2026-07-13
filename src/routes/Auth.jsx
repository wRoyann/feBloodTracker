import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "@/utils/localStorage";

const Auth = ({ children }) => {
  const token = getLocalStorage("token");
  const currentLocation = useLocation().pathname;

  if (!token && currentLocation !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (token && currentLocation === "/login") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Auth;
