import { Navigate } from "react-router-dom";
import { getLocalStorage } from "@/utils/localStorage";
import { toast } from "sonner";

const AdminAuth = ({ children }) => {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role_id === 1) {
    return <>{children}</>;
  }

  if (user?.role_id === 4) {
    if (user?.organisasi?.status === "pending") {
      toast.error("Akun Anda belum disetujui oleh admin", {
        id: "pending-auth",
      });
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default AdminAuth;
