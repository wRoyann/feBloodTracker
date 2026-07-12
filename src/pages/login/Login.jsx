import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Droplet, Eye, EyeOff, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/auth";
import { setLocalStorage } from "@/utils/localStorage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: (data) => {
        setLocalStorage("token", data.token);
        setLocalStorage("user", data.user);
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#FBEDEC] lg:bg-white flex items-center justify-center lg:items-stretch p-4 sm:p-6 lg:p-0">
      <div className="w-full max-w-sm lg:max-w-none lg:w-full lg:flex bg-white rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-black/5 lg:border-0 overflow-hidden">
        {/* PANEL KIRI — hanya desktop */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-[#FBEDEC] px-14 py-12">
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 max-w-md">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop"
                alt="Relawan mendampingi pendonor darah"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-md">
            <p className="font-serif text-[26px] leading-snug text-[#1F2937]">
              "Setetes darah Anda, sejuta harapan bagi sesama."
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#1F2937]/55">
              Bergabunglah dengan komunitas LifeStream dan bantu kami
              menyelamatkan nyawa setiap harinya.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1F2937]/40">
            <Droplet
              className="h-3.5 w-3.5 text-[#E11D2E]"
              fill="#E11D2E"
              strokeWidth={0}
            />
            <span className="tracking-[0.15em] uppercase font-medium">
              LifeStream Humanitarian
            </span>
          </div>
        </div>

        {/* PANEL KANAN — form (mobile: satu-satunya panel) */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
          <div className="w-full max-w-90 mx-auto lg:mx-0">
            {/* logo */}
            <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-8">
              <div className="flex h-14 w-14 lg:h-9 lg:w-9 items-center justify-center rounded-2xl lg:rounded-lg bg-[#E11D2E] mb-3 lg:mb-3">
                <Droplet
                  className="h-6 w-6 lg:h-4 lg:w-4 text-white"
                  fill="white"
                  strokeWidth={0}
                />
              </div>
              <span className="hidden lg:inline text-sm font-semibold text-[#1F2937]">
                LifeStream
              </span>
            </div>

            <h1 className="font-serif text-2xl text-center lg:text-left text-[#1F2937]">
              Selamat Datang Kembali
            </h1>
            <p className="mt-2 text-sm text-center lg:text-left text-[#1F2937]/50 leading-relaxed">
              Setetes darah Anda adalah harapan bagi mereka. Masuk untuk lanjut
              beraksi.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[#1F2937]/70 text-sm"
                >
                  Email atau Nomor HP
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="contoh@mail.com"
                  required
                  value={form.email}
                  onChange={handleChange("email")}
                  className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[#1F2937]/70 text-sm"
                  >
                    Kata Sandi
                  </Label>
                  <a
                    href="/forgot-password"
                    className="text-xs font-medium text-[#E11D2E] hover:underline underline-offset-4"
                  >
                    Lupa Kata Sandi?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={form.password}
                    onChange={handleChange("password")}
                    className="h-11 pr-10 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2937]/35 hover:text-[#1F2937]/60 transition-colors"
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </div>

              <label className="hidden lg:flex items-center gap-2 pt-0.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded-sm border-[#1F2937]/25 accent-[#E11D2E]"
                />
                <span className="text-xs text-[#1F2937]/55">
                  Ingat saya di perangkat ini
                </span>
              </label>

              {isError && (
                <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error?.response?.data?.message ||
                    "Terjadi kesalahan. Silakan coba lagi."}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-[#E11D2E] hover:bg-[#E11D2E]/90 text-white font-medium group"
              >
                {isPending ? "Memeriksa…" : "Masuk"}
                <span className="hidden lg:inline">
                  {isPending ? "" : " Sekarang"}
                </span>
                {!isPending && (
                  <ArrowRight
                    className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#1F2937]/55">
              Belum punya akun?{" "}
              <a
                href="/register"
                className="text-[#E11D2E] font-medium hover:underline underline-offset-4"
              >
                Daftar sebagai Donor
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
