import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../assets/brandaimages.jpg";
import Search from "../../components/ui/search";
import Buttons from "../../components/ui/buttons";
import { Navigation, Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { bloodRequests } from "../../data/bloodRequest";
import { dataGolongan } from "../../data/macamGolongan";
import CustomBox from "../../components/ui/custombox";
import GradientBox from "../../components/ui/gradientbox/GradientBox";
import { useMediaQuery } from "react-responsive";

const Beranda = () => {
  const [isStock, setIsStock] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const handleStockBlood = () => {
    setIsStock((prev) => !prev);
    console.log(isStock);
  };
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      duration: 20, // ~ setara transisi cepat, embla pakai satuan "tick" bukan ms
    },
    [autoplay.current],
  );

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="relative items-center justify-center">
          <img
            src={Hero}
            alt="Hero"
            className="w-full h-auto rounded-2xl md:object-cover md:h-70"
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-xl text-shadow-lg font-semibold md:text-5xl text-white/90">
              Setetes Darah Sejuta Harapan
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-4xl px-4">
                <Search
                  placeholder="Cari lokasi donor..."
                  className="w-1/2 rounded-full bg-white/80 px-4 py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Buttons
            className="w-full h-14 bg-[#006A61] text-md text-white gap-2"
            variant="outline"
          >
            <Navigation size={20} />
            Cari Lokasi Terdekat
          </Buttons>
          <Buttons
            className="w-full h-14 bg-[#DC2626] text-md text-white gap-2"
            variant="outline"
          >
            <Siren size={20} />
            Buat Permintaan Darurat
          </Buttons>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xl">Permintaan Darurat</p>
            <Link to="/permintaandarurat" className="text-[#DC2626]">
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-hidden mt-4" ref={emblaRef}>
            <div className="flex gap-4">
              {bloodRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-2 rounded-2xl border border-[#DC2626]/10 bg-white/90 p-4 shadow-sm transition hover:border-[#DC2626] shrink-0 basis-70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                      <p className="bg-[#991B1B]/10 text-[#991B1B] font-bold text-md px-5 py-2 rounded-full">
                        URGENT
                      </p>
                      <p className="text-[#916F6B]">{request.time}</p>
                    </div>
                  </div>

                  <p className="text-2xl font-semibold">
                    Butuh {request.bagsNeeded} Kantong {request.bloodType}
                  </p>
                  <p className="text-[#5C403C]">{request.hospital}</p>

                  <div className="flex gap-4 items-center">
                    <img
                      src={request.icon}
                      alt={request.name}
                      className="rounded-full size-8"
                    />
                    <Buttons
                      variant="destructive"
                      className="bg-transparent text-[#B70011] border-2 border-[#B70011]"
                    >
                      Bantu
                    </Buttons>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xl">Stock Dibutuhkan Saat Ini</p>
            <p
              className="text-[#DC2626] cursor-pointer md:hidden"
              onClick={handleStockBlood}
            >
              Lihat Semua
            </p>
          </div>
          <div>
            <div
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4`}
            >
              {Object.entries(dataGolongan)
                .slice(0, isDesktop || isStock ? 8 : 4)
                .map(([type, value]) => {
                  let status = "";
                  let title = "";
                  let color = "bg-gray-300";
                  if (value >= 80) {
                    status = "Sangat Stabil";
                    color = "bg-green-600";
                    title = "Cukup Stock";
                  } else if (value >= 60) {
                    status = "Stabil";
                    color = "bg-green-400";
                    title = "Cukup Stock";
                  } else if (value >= 40) {
                    status = "Rendah";
                    color = "bg-yellow-400";
                    title = "Perlu Donor";
                  } else {
                    status = "Kritis";
                    color = "bg-red-500";
                    title = "Sangat Rendah";
                  }

                  return (
                    <CustomBox
                      key={type}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="flex justify-center items-center border-2 border-[#B70011] size-15 rounded-full">
                        <p className="font-bold text-[#B70011] text-2xl">
                          {type}
                        </p>
                      </div>
                      <p className="bg-[#991B1B]/10 py-2 px-4 rounded-full text-sm text-[#991B1B]">
                        {status}
                      </p>
                      <div className="w-full h-2 bg-[#FBDBD7] rounded-full overflow-hidden">
                        <div
                          className={`${color} h-full rounded-full transition-all duration-300`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <p className="text-[#916F6B]">{title}</p>
                    </CustomBox>
                  );
                })}
            </div>
          </div>
        </div>
        <GradientBox>
          <h2 className="text-4xl font-bold">Dampak Komunitas</h2>

          <p className="mt-4 text-[#E2CFCF] text-xl leading-relaxed max-w-md">
            Bulan ini, kita telah menyelamatkan 1.240 nyawa melalui donor darah
            sukarela.
          </p>

          <div className="mt-10 flex gap-16">
            <div>
              <h3 className="text-6xl font-bold text-[#FFE2E2]">842</h3>
              <p className="text-[#D8C4C4]">Donor Aktif</p>
            </div>

            <div>
              <h3 className="text-6xl font-bold text-[#9FF8EF]">12</h3>
              <p className="text-[#D8C4C4]">Event Baru</p>
            </div>
          </div>
        </GradientBox>
      </div>
    </Layout>
  );
};

export default Beranda;
