import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  Clock3,
  LogOut,
  UserRoundPen,
  CircleCheck,
} from "lucide-react";
import Buttons from "@/components/ui/buttons";
import Layout from "@/components/layout";
import CustomBox from "@/components/ui/custombox";
import { useLogout } from "@/hooks/useLogout";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";

const menuItems = [
  {
    title: "Ubah Profil",
    description: "Update data diri & kontak",
    icon: UserRoundPen,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Riwayat Donor",
    description: "Lihat 12 donasi terakhir",
    icon: Clock3,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Pengaturan Notifikasi",
    description: "Kelola pengingat jadwal donor",
    icon: Bell,
    color: "bg-blue-600 text-white",
  },
];

const stats = [
  {
    value: "12",
    label: "Total Donor",
    color: "text-[#B70011]",
  },
  {
    value: "4.2L",
    label: "Darah Disumbangkan",
    color: "text-[#0F766E]",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();
  const user = getLocalStorage("user");

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        removeLocalStorage("token");
        removeLocalStorage("user");
        navigate("/login");
      },
      onError: () => {
        removeLocalStorage("token");
        removeLocalStorage("user");
        navigate("/login");
      },
    });
  };

  return (
    <Layout>
      <section className="space-y-6">
        <CustomBox>
          <div className="flex flex-col items-center">
            <div className="flex size-28 items-center justify-center rounded-full border-4 border-[#B70011]">
              <span className="text-5xl font-extrabold text-[#B70011]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <h2 className="mt-6 text-4xl text-center font-bold text-[#2C1E1E]">
              {user.name || "Pengguna"}
            </h2>

            <p className="mt-1 text-xl text-[#6B4B47]">Pendonor Teladan</p>

            <div className="mt-8 w-full rounded-2xl bg-[#FFF2F0] p-6 text-center border border-[#F4C5C0]">
              <div className="flex items-center justify-center gap-2">
                <CircleCheck size={22} className="text-green-500" />
                <p className="text-2xl font-semibold text-green-600">
                  Siap Berdonor
                </p>
              </div>

              <p className="mt-2 text-[#5C403C]">
                Boleh donor lagi mulai:
                <span className="font-semibold"> 12 Okt 2023</span>
              </p>
            </div>
          </div>
        </CustomBox>

        <CustomBox className="overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`flex w-full items-center justify-between p-5 transition hover:bg-red-50 ${
                  index !== menuItems.length - 1
                    ? "border-b border-[#F4D3CF]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-12 items-center justify-center rounded-full ${item.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-[#2C1E1E]">{item.title}</p>

                    <p className="text-sm text-[#6B4B47]">{item.description}</p>
                  </div>
                </div>

                <ChevronRight className="text-[#8A6A66]" />
              </button>
            );
          })}
        </CustomBox>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((item) => (
            <CustomBox key={item.label} className="text-center">
              <h2 className={`text-4xl font-bold ${item.color}`}>
                {item.value}
              </h2>

              <p className="mt-2 text-[#5C403C]">{item.label}</p>
            </CustomBox>
          ))}
        </div>

        <Buttons
          variant="outline"
          onClick={handleLogout}
          disabled={isPending}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#B70011] text-xl font-semibold text-[#B70011] hover:bg-[#B70011] hover:text-white"
        >
          <LogOut size={22} />
          {isPending ? "Keluar…" : "Keluar dari Akun"}
        </Buttons>
      </section>
    </Layout>
  );
};

export default Profile;
