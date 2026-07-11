import Beranda from "../pages/beranda";
import CariLokasiDonor from "../pages/carilokasidonor";
import PermintaanDarurat from "../pages/permintaandarurat";
import Profile from "../pages/profile";
import RiwayatDonor from "../pages/riwayatdonor";
import StockDarah from "../pages/stockdarah";

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
    path: "/stockdarah",
    element: <StockDarah />,
  },
];

export default Routes;
