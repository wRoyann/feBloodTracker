import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Info, Siren } from "lucide-react";
import React from "react";

const PermintaanDarurat = () => {
  return (
    <Layout>
      <div>
        <div className="flex flex-col items-center gap-4">
          <Button className="flex w-full h-14 p-4 font-semibold text-lg items-center gap-3 bg-[#B70011]">
            <Siren className="size-7 shrink-0" />
            <p>+ Buat Permintaan Darurat</p>
          </Button>
          <h3 className="text-[#5C403C] text-center">
            Gunakan tombol di atas hanya untuk situasi medis kritiss yang
            mendesak
          </h3>
        </div>
        <div className="bg-[#0078B2]/10 border-2 border-[#0078B2]/20 rounded-2xl">
          <div className="flex gap-3 p-4">
            <Info />
            <div>
              <h2>Informasmi Pendonor</h2>
              <p>
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
