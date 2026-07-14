import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import BloodRequestGroup from "@/components/ui/bloodrequests";
import { Info, Siren } from "lucide-react";

const PermintaanDarurat = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {/* <div className="flex flex-col items-center gap-4">
          <Button className="flex w-full h-14 p-4 font-semibold text-lg items-center gap-3 bg-[#B70011]">
            <Siren className="size-7 shrink-0" />
            <p>+ Buat Permintaan Darurat</p>
          </Button>
          <h3 className="text-[#5C403C] text-center">
            Gunakan tombol di atas hanya untuk situasi medis kritiss yang
            mendesak
          </h3>
        </div> */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-xl ">Permintaan Aktif</p>
            <div className="flex items-center bg-white/20 border-2 border-[#DC2626]/20 rounded-lg p-2 gap-3">
              <div className="bg-[#16A34A] rounded-full size-3 animate-pulse"></div>
              <p>Live: 12 Kasus</p>
            </div>
          </div>
          <BloodRequestGroup />
        </div>
        <div className="bg-[#0078B2]/10 border-2 border-[#0078B2]/20 rounded-2xl">
          <div className="flex gap-3 p-4 text-[#005E8D]">
            <Info className="shrink-0" size={30} />
            <div>
              <h2 className="font-semibold text-2xl">Informasmi Pendonor</h2>
              <p className="text-[#5C403C] text-md">
                Pastikan anda sudah makan dan istirahat yang cukup sebelum
                merespon permintaan darurat. Bawa kartu identitas resmi saat
                mendatangi Rumah Sakit
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PermintaanDarurat;
