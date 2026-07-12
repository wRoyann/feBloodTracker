import { History, House, MapPin, Siren, User } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const Routes = [
    {
      path: "/",
      label: "Beranda",
      icon: <House />,
    },
    {
      path: "/carilokasidonor",
      label: "Location",
      icon: <MapPin />,
    },
    {
      path: "/permintaandarurat",
      label: "Request",
      icon: <Siren />,
    },
    {
      path: "/riwayatdonor",
      label: "History",
      icon: <History />,
    },
    {
      path: "/profile",
      label: "Profile",
      icon: <User />,
    },
  ];

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
    md:justify-start
    md:rounded-none
    md:border-r
    md:border-t-0
    md:shadow-2xl
  "
    >
      <div className="hidden md:flex items-center gap-2 w-full mb-6 px-2 pt-4">
        <h1 className="text-2xl font-extrabold text-[#B70011]">DONOR LINK</h1>
      </div>

      <div className="flex w-full justify-between md:flex-col md:gap-2">
        {Routes.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center md:gap-3 md:p-4 rounded-lg transition-all duration-300 w-auto md:w-full ${
                isActive
                  ? "text-[#B70011] md:text-white md:bg-[#B70011]"
                  : "hover:text-[#B70011] md:hover:text-white md:hover:bg-[#B70011]"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
