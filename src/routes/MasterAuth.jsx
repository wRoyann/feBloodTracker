import { Navigate } from "react-router-dom";
import { getLocalStorage } from "@/utils/localStorage";

const MasterAuth = ({ children }) => {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role_id !== 1) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default MasterAuth;
