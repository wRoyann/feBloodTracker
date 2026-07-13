import { bloodRequests } from "@/data/bloodRequest";
import { Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomBox from "../custombox";
import Buttons from "../buttons";

const bloodTypeColors = {
  "A+": "bg-red-100 text-red-700 border-red-200",
  "A-": "bg-orange-100 text-orange-700 border-orange-200",
  "B+": "bg-blue-100 text-blue-700 border-blue-200",
  "B-": "bg-purple-100 text-purple-700 border-purple-200",
  "AB+": "bg-green-100 text-green-700 border-green-200",
  "AB-": "bg-teal-100 text-teal-700 border-teal-200",
  "O+": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "O-": "bg-pink-100 text-pink-700 border-pink-200",
};

const getProgressColor = (pct) => {
  if (pct >= 80) return "bg-green-600";
  if (pct >= 50) return "bg-amber-500";
  return "bg-[#B70011]";
};

const getProgressTextColor = (pct) => {
  if (pct >= 80) return "text-green-600";
  if (pct >= 50) return "text-amber-500";
  return "text-[#B70011]";
};

const BloodRequestGroup = () => {
  const navigate = useNavigate();
  const grouped = bloodRequests.reduce((acc, item) => {
    if (!acc[item.bloodType]) acc[item.bloodType] = [];
    acc[item.bloodType].push(item);
    return acc;
  }, {});

  const sortedTypes = Object.keys(grouped).sort();

  if (sortedTypes.length === 0) {
    return (
      <p className="text-[#5C403C] text-center py-4">
        Belum ada permintaan darah saat ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedTypes.map((bloodType) => {
        const items = grouped[bloodType];
        const totalNeeded = items.reduce((sum, i) => sum + i.bagsNeeded, 0);
        const totalConfirmed = items.reduce(
          (sum, i) => sum + i.donorsConfirmed,
          0,
        );
        const percentage =
          totalNeeded > 0
            ? Math.min(Math.round((totalConfirmed / totalNeeded) * 100), 100)
            : 0;

        return (
          <CustomBox key={bloodType}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${bloodTypeColors[bloodType] || "bg-gray-100 text-gray-700"}`}
                >
                  {bloodType}
                </span>
                <span className="text-xs text-[#5C403C]">
                  {totalConfirmed}/{totalNeeded} kantong
                </span>
              </div>
              <div className="ml-auto">
                <span className="inline-block text-[11px] font-semibold px-2 py-1 rounded-full bg-[#FFF4F3] text-[#B70011] border border-[#F5C1C1]">
                  {items.map((i) => {
                    return i.status;
                  })}
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="space-y-2">
              {items.map((item) => {
                const itemPercentage =
                  item.bagsNeeded > 0
                    ? Math.min(
                        Math.round(
                          (item.donorsConfirmed / item.bagsNeeded) * 100,
                        ),
                        100,
                      )
                    : 0;

                return (
                  <div key={item.id} className=" flex flex-col gap-2">
                    <div className="bg-[#FFF0EE] rounded-lg p-2.5 sm:p-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#B70011]/10 flex items-center justify-center shrink-0">
                          <Droplets className="text-[#B70011]" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#2C1E1E] truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#5C403C] truncate">
                            {item.hospital}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p
                            className={`text-xs sm:text-sm font-semibold ${getProgressTextColor(itemPercentage)}`}
                          >
                            {itemPercentage}%
                          </p>
                          <p className="text-[10px] sm:text-xs text-[#5C403C]">
                            {item.donorsConfirmed}/{item.bagsNeeded}
                          </p>
                        </div>
                      </div>
                    </div>
                    {item.status === "URGENT" ? (
                      <Buttons
                        onClick={() => {
                          toast.success(
                            "Terima kasih! Anda akan diarahkan ke halaman lokasi donor.",
                            { id: "bersedia" },
                          );
                          navigate("/carilokasidonor");
                        }}
                        className="bg-[#006A61] hover:bg-[#006A61]/70 text-white w-full rounded-xl h-10 text-sm font-semibold"
                      >
                        Saya Bersedia
                      </Buttons>
                    ) : (
                      <Buttons
                        onClick={() => navigate("/detail")}
                        className="bg-[#282815] hover:bg-[#281715]/70 text-white w-full rounded-xl h-10 text-sm font-semibold"
                      >
                        Lihat Detail
                      </Buttons>
                    )}
                  </div>
                );
              })}
            </div>
          </CustomBox>
        );
      })}
    </div>
  );
};

export default BloodRequestGroup;
