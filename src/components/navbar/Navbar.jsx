import { History, House, MapPin, Siren, User } from "lucide-react";
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
    <nav className="flex fixed z-20 bottom-0 left-0 right-0 justify-between items-center bg-white p-4 outline-1 outline-[#E5E7EB] rounded-t-lg font-semibold">
      {Routes.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="flex flex-col items-center hover:text-[#B70011] transition-colors duration-300"
        >
          <span>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
