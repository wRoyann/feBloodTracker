import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Layout from "../../components/layout/Layout";
import Hero from "../../assets/brandaimages.jpg";
import Search from "../../components/ui/search";
import Buttons from "../../components/ui/buttons";
import { Navigation, Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { bloodRequests } from "../../data/bloodRequest";

const Beranda = () => {
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
          <img src={Hero} alt="Hero" className="w-full h-auto rounded-2xl" />
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-lg font-semibold text-white/90">
              Setetes Darah Sejuta Harapan
            </p>
            <div className="mt-4 flex justify-center">
              <Search
                placeholder="Cari lokasi donor..."
                className="bg-white/80 rounded-full px-4 py-2 w-full focus:outline-none focus:text-black/70 transition duration-300"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
                  className="flex flex-col gap-2 rounded-2xl border border-[#DC2626]/10 bg-white/90 p-4 shadow-sm transition hover:border-[#DC2626] shrink-0 basis-[280px]"
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
      </div>
    </Layout>
  );
};

export default Beranda;
