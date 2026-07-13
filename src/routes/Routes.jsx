import Beranda from "../pages/beranda";
import CariLokasiDonor from "../pages/carilokasidonor";
import Login from "../pages/login";
import PermintaanDarurat from "../pages/permintaandarurat";
import Profile from "../pages/profile";
import Register from "../pages/register";
import RiwayatDonor from "../pages/riwayatdonor";
import Auth from "./Auth";

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
    element: (
      <Auth>
        <PermintaanDarurat />
      </Auth>
    ),
  },
  {
    path: "/profile",
    element: (
      <Auth>
        <Profile />
      </Auth>
    ),
  },
  {
    path: "/riwayatdonor",
    element: (
      <Auth>
        <RiwayatDonor />
      </Auth>
    ),
  },
  {
    path: "/login",
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default Routes;
