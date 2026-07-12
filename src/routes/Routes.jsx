import Beranda from "../pages/beranda";
import CariLokasiDonor from "../pages/carilokasidonor";
import Login from "../pages/login";
import PermintaanDarurat from "../pages/permintaandarurat";
import Profile from "../pages/profile";
import Register from "../pages/register";
import RiwayatDonor from "../pages/riwayatdonor";

const Routes = [
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/carilokasidonor",
    element: <CariLokasiDonor />,
  },
  {
    path: "/permintaandarurat",
    element: <PermintaanDarurat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/riwayatdonor",
    element: <RiwayatDonor />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default Routes;
