import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "@/utils/localStorage";

const Auth = ({ children }) => {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const currentLocation = useLocation().pathname;

  if (!token && currentLocation !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (token && currentLocation === "/login") {
    if (user?.role_id === 1) {
      return <Navigate to="/admin/master" replace />;
    }
    if (user?.role_id === 4) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  if (token && user?.role_id === 1 && currentLocation !== "/admin/master") {
    return <Navigate to="/admin/master" replace />;
  }

  if (token && user?.role_id === 4 && !currentLocation.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default Auth;
