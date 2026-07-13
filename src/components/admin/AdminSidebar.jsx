import {
  LayoutDashboard,
  Users,
  Siren,
  MapPin,
  Settings,
  LogOut,
  Droplets,
  Shield,
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
    ...(isSuperAdmin
      ? [
          {
            path: "/admin/master",
            label: "Master Admin",
            icon: <Shield size={20} />,
          },
        ]
      : []),
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
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
        fixed z-20
        bottom-0 left-0 right-0
        flex justify-between items-center
        bg-white p-4
        border-t border-[#E5E7EB]

        md:top-0
        md:bottom-0
        md:right-auto
        md:w-64
        md:flex-col
        md:items-start
        md:justify-between
        md:rounded-none
        md:border-r
        md:border-t-0
        md:shadow-2xl
      "
    >
      <div className="hidden md:flex items-center gap-2 w-full px-2 pt-4">
        <Droplets className="text-[#B70011]" size={28} />
        <h1 className="text-xl font-extrabold text-[#B70011]">BloodTracker</h1>
        <span className="ml-auto text-[10px] font-semibold bg-[#B70011] text-white px-2 py-0.5 rounded-full">
          {isSuperAdmin ? "SUPER ADMIN" : "ADMIN"}
        </span>
      </div>

      <div className="flex w-full justify-between md:flex-col md:gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center md:gap-3 md:px-4 md:py-3 rounded-lg transition-all duration-300 w-auto md:w-full ${
                isActive
                  ? "text-[#B70011] md:text-white md:bg-[#B70011]"
                  : "text-gray-500 hover:text-[#B70011] md:hover:text-white md:hover:bg-[#B70011]"
              }`
            }
          >
            {item.icon}
            <span className="text-xs md:text-sm">{item.label}</span>
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
