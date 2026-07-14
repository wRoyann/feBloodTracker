import Beranda from "../pages/beranda";
import CariLokasiDonor from "../pages/carilokasidonor";
import Login from "../pages/login";
import PermintaanDarurat from "../pages/permintaandarurat";
import Profile from "../pages/profile";
import Register from "../pages/register";
import RiwayatDonor from "../pages/riwayatdonor";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminBloodRequests from "../pages/admin/BloodRequests";
import AdminLocations from "../pages/admin/Locations";
import AdminSettings from "../pages/admin/Settings";
import AdminMaster from "../pages/admin/Master";
import TipeGolonganDarah from "../pages/admin/TipeGolonganDarah";
import Auth from "./Auth";
import AdminAuth from "./AdminAuth";
import MasterAuth from "./MasterAuth";

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
  {
    path: "/admin/master",
    element: (
      <MasterAuth>
        <AdminMaster />
      </MasterAuth>
    ),
  },
  {
    path: "/admin/tipe-golongan-darah",
    element: (
      <AdminAuth>
        <TipeGolonganDarah />
      </AdminAuth>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminAuth>
        <AdminDashboard />
      </AdminAuth>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminAuth>
        <AdminUsers />
      </AdminAuth>
    ),
  },
  {
    path: "/admin/requests",
    element: (
      <AdminAuth>
        <AdminBloodRequests />
      </AdminAuth>
    ),
  },
  {
    path: "/admin/locations",
    element: (
      <AdminAuth>
        <AdminLocations />
      </AdminAuth>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <AdminAuth>
        <AdminSettings />
      </AdminAuth>
    ),
  },
];

export default Routes;
