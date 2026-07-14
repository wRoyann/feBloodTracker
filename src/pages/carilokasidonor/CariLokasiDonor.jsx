import Layout from "@/components/layout";
import CustomBox from "@/components/ui/custombox";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export const donorLocations = [
  {
    id: 1,
    type: "PMI PUSAT",
    verified: true,
    name: "Unit Donor Darah PMI Jakarta",
    address: "Jl. Kramat Raya No.47, Senen, Jakarta Pusat",
    distance: "0.8 KM",
    open: "Buka 24 Jam",
    latitude: -6.186486,
    longitude: 106.844599,
  },
  {
    id: 2,
    type: "RS",
    verified: true,
    name: "RSUPN Dr. Cipto Mangunkusumo",
    address: "Jl. Diponegoro No.71, Jakarta Pusat",
    distance: "1.2 KM",
    open: "Buka 24 Jam",
    latitude: -6.197017,
    longitude: 106.846529,
  },
  {
    id: 3,
    type: "PMI CABANG",
    verified: true,
    name: "PMI Kota Tangerang",
    address: "Jl. Mayjen Sutoyo No.15, Tangerang",
    distance: "2.4 KM",
    open: "Buka 24 Jam",
    latitude: -6.176329,
    longitude: 106.630783,
  },
  {
    id: 4,
    type: "RS",
    verified: false,
    name: "RSUD Kabupaten Tangerang",
    address: "Jl. Jenderal Ahmad Yani No.9, Tangerang",
    distance: "3.1 KM",
    open: "Buka 24 Jam",
    latitude: -6.178462,
    longitude: 106.638741,
  },
  {
    id: 5,
    type: "PMI CABANG",
    verified: true,
    name: "PMI Kota Bekasi",
    address: "Jl. Pramuka No.1, Bekasi Selatan",
    distance: "5.8 KM",
    open: "Buka 24 Jam",
    latitude: -6.238271,
    longitude: 106.992346,
  },
  {
    id: 6,
    type: "RS",
    verified: true,
    name: "RS Siloam Lippo Village",
    address: "Jl. Siloam No.6, Kelapa Dua, Tangerang",
    distance: "7.5 KM",
    open: "Buka 24 Jam",
    latitude: -6.223832,
    longitude: 106.618329,
  },
];

const CariLokasiDonor = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div>
          <MapContainer
            center={[-6.2088, 106.8456]}
            zoom={13}
            className="h-125 w-full rounded-xl border-2 border-white"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {donorLocations.map((location) => (
            <CustomBox
              key={location.id}
              className="rounded-2xl border bg-white p-4 shadow-sm hover:border-[#006A61] duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="rounded-full bg-[#FBDBD7] px-3 py-1 text-xs font-semibold text-[#5C403C]">
                    {location.type}
                  </span>

                  {location.verified && (
                    <span className="rounded-full bg-[#006A61]/20 px-3 py-1 text-xs font-semibold text-[#006A61]">
                      TERVERIFIKASI
                    </span>
                  )}
                </div>

                <p className="font-bold text-[#B70011]">{location.distance}</p>
              </div>

              <h3 className="mt-2 text-xl font-semibold text-[#281715]">
                {location.name}
              </h3>

              <p className="mt-2 text-[#5C403C]">{location.address}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#5C403C]">{location.open}</span>

                <button className="rounded-lg bg-[#006A61] px-4 py-2 text-white hover:bg-[#006A61]/80 duration-300">
                  Lihat Detail
                </button>
              </div>
            </CustomBox>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CariLokasiDonor;
