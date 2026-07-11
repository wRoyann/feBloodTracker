import Beranda from "../pages/beranda";
import CariLokasiDonor from "../pages/carilokasidonor";
import PermintaanDarurat from "../pages/permintaandarurat";
import Profile from "../pages/profile";
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
];

export default Routes;
