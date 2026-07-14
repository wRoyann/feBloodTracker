import {
  LayoutDashboard,
  Users,
  Siren,
  MapPin,
  Settings,
  LogOut,
  Droplets,
  Shield,
  HeartPulse,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getLocalStorage } from "@/utils/localStorage";
import { useLogout } from "@/hooks/useLogout";
import { removeLocalStorage } from "@/utils/localStorage";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const user = getLocalStorage("user");
  const isSuperAdmin = user?.role_id === 1;

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    ...(isSuperAdmin
      ? [
          {
            path: "/admin/master",
            label: "Master Admin",
            icon: <Shield size={20} />,
          },
          {
            path: "/admin/tipe-golongan-darah",
            label: "Golongan Darah",
            icon: <HeartPulse size={20} />,
          },
        ]
      : []),
    {
      path: "/admin/users",
      label: "Users",
      icon: <Users size={20} />,
    },
    {
      path: "/admin/requests",
      label: "Blood Requests",
      icon: <Siren size={20} />,
    },
    {
      path: "/admin/stock-darah",
      label: "Stock Darah",
      icon: <Droplets size={20} />,
    },
    {
      path: "/admin/locations",
      label: "Locations",
      icon: <MapPin size={20} />,
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        removeLocalStorage("token");
        removeLocalStorage("user");
        navigate("/login");
      },
      onError: () => {
        removeLocalStorage("token");
        removeLocalStorage("user");
        navigate("/login");
      },
    });
  };

  return (
    <nav
      className="
        fixed z-20 top-0 left-0 bottom-0
        w-16
        flex flex-col items-center
        bg-white border-r border-[#E5E7EB]

        md:w-64
        md:items-start
        md:justify-between
        md:shadow-2xl
      "
    >
      <div className="flex items-center justify-center w-full px-2 pt-4 md:justify-start">
        <Droplets className="text-[#B70011]" size={28} />
        <h1 className="hidden md:inline text-xl font-extrabold text-[#B70011] ml-2">
          BloodTracker
        </h1>
        <span className="hidden md:inline ml-auto text-[10px] font-semibold bg-[#B70011] text-white px-2 py-0.5 rounded-full">
          {isSuperAdmin ? "SUPER ADMIN" : "ADMIN"}
        </span>
      </div>

      <div className="flex flex-col items-center w-full gap-1 md:items-stretch md:px-2 md:mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center gap-0.5 md:gap-3 px-2 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-300 md:w-full ${
                isActive
                  ? "text-[#B70011] md:text-white md:bg-[#B70011]"
                  : "text-gray-500 hover:text-[#B70011] md:hover:text-white md:hover:bg-[#B70011]"
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] md:text-sm">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="hidden md:block w-full border-t border-gray-200 pt-4 mt-4 px-2">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#B70011] flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "admin@bloodtracker.com"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-500 hover:text-[#B70011] hover:bg-red-50 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminSidebar;
