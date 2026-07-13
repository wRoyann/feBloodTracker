import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplet, X, Eye, EyeOff, ChevronDown, Building2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/useRegister";

const JENIS_ORGANISASI_OPTIONS = [
  "Rumah Sakit",
  "Palang Merah Indonesia (PMI)",
  "Perusahaan / Korporat",
  "Komunitas / Yayasan",
  "Instansi Pemerintah",
  "Lainnya",
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // opt-in organisasi
  const [isOrganisasi, setIsOrganisasi] = useState(false);
  const [jenisOrgOpen, setJenisOrgOpen] = useState(false);
  const [jenisOrganisasi, setJenisOrganisasi] = useState("");
  const { mutate, isPending, isError, error } = useRegister();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    nama_organisasi: "",
    alamat_organisasi: "",
    telepon_organisasi: "",
    email_organisasi: "",
    jenis_organisasi: "",
    password_confirmation: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role_id: isOrganisasi ? 4 : 2,
      password_confirmation: form.password_confirmation,
      ...(isOrganisasi && {
        nama_organisasi: form.nama_organisasi,
        alamat_organisasi: form.alamat_organisasi,
        telepon_organisasi: form.telepon_organisasi,
        email_organisasi: form.email_organisasi,
        jenis_organisasi: jenisOrganisasi,
      }),
    };

    mutate(payload, {
      onSuccess: () => {
        if (isOrganisasi) {
          toast.success(
            "Registrasi berhasil! Akun Anda sedang menunggu persetujuan admin."
          );
          navigate("/login");
        } else {
          navigate("/login");
        }
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5F7] lg:bg-white flex items-center justify-center lg:items-stretch p-4 sm:p-6 lg:p-0">
      <div className="w-full max-w-sm lg:max-w-none lg:w-full lg:flex bg-white rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-black/5 lg:border-0 relative">
        {/* tombol tutup — mobile only, gaya modal */}
        <button
          type="button"
          className="lg:hidden absolute right-4 top-4 z-10 text-[#1F2937]/40 hover:text-[#1F2937]/70 transition-colors"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* PANEL KIRI — hanya desktop, hero merah */}
        <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between bg-[#E11D2E] text-white px-14 py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative flex items-center gap-2">
            <Droplet
              className="h-4.5 w-4.5 text-white"
              fill="white"
              strokeWidth={0}
            />
            <span className="text-sm font-semibold">LifeSource</span>
          </div>

          <div className="relative max-w-sm">
            <h1 className="font-serif text-[28px] leading-[1.15] font-medium">
              Satu langkah kecil Anda, harapan besar bagi mereka.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Bergabunglah dengan komunitas pendonor terjadwal dan jadi bagian
              dari perubahan nyata dalam sistem kesehatan nasional.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 max-w-fit">
            <div className="flex -space-x-2">
              {["#F59E0B", "#EF4444", "#3B82F6", "#8B5CF6"].map((color) => (
                <span
                  key={color}
                  className="h-7 w-7 rounded-full border-2 border-[#E11D2E]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">12,482</p>
              <p className="text-[11px] text-white/60 mt-1">
                Nyawa Terselamatkan
              </p>
            </div>
          </div>
        </div>

        {/* PANEL KANAN — form (mobile: satu-satunya panel) */}
        <div className="flex-1 lg:w-[58%] px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-14 lg:flex lg:flex-col lg:justify-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* header mobile: logo + judul gaya "modal" */}
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E11D2E]">
                <Droplet
                  className="h-4 w-4 text-white"
                  fill="white"
                  strokeWidth={0}
                />
              </div>
              <span className="text-sm font-semibold text-[#1F2937]">
                LifeSource
              </span>
            </div>

            <div className="mb-6 lg:mb-8">
              <h1 className="font-serif text-2xl text-[#1F2937]">
                <span className="lg:hidden">Daftar Akun Baru</span>
                <span className="hidden lg:inline">Daftar Akun</span>
              </h1>
              <p className="mt-2 text-sm text-[#1F2937]/50 leading-relaxed">
                <span className="lg:hidden">
                  Bergabunglah menjadi pahlawan kemanusiaan.
                </span>
                <span className="hidden lg:inline">
                  Mulai perjalanan kemanusiaan Anda hari ini.
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ==== FORM DASAR — selalu tampil ==== */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[#1F2937]/70 text-sm">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama sesuai KTP"
                  required
                  value={form.name}
                  onChange={handleChange("name")}
                  className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[#1F2937]/70 text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                  />
                </div>
              </div>

              {/* ==== TOGGLE OPT-IN ORGANISASI ==== */}
              <div className="rounded-lg border border-[#1F2937]/10">
                <label className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none bg-[#1F2937]/2">
                  <div className="flex items-center gap-2.5">
                    <Building2
                      className="h-4 w-4 text-[#1F2937]/50"
                      strokeWidth={1.75}
                    />
                    <div>
                      <p className="text-sm font-medium text-[#1F2937]">
                        Daftar atas nama organisasi
                      </p>
                      <p className="text-xs text-[#1F2937]/45">
                        Opsional — untuk RS, PMI, komunitas, atau instansi
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOrganisasi}
                    onClick={() => setIsOrganisasi((v) => !v)}
                    className={`relative h-5.5 w-10 shrink-0 rounded-full transition-colors ${
                      isOrganisasi ? "bg-[#E11D2E]" : "bg-[#1F2937]/20"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-transform ${
                        isOrganisasi ? "translate-x-4.75" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </label>

                {/* ==== FIELD TAMBAHAN — hanya muncul kalau toggle aktif ==== */}
                {isOrganisasi && (
                  <div className="space-y-4 px-4 py-4 border-t border-[#1F2937]/10">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="nama_organisasi"
                        className="text-[#1F2937]/70 text-sm"
                      >
                        Nama Organisasi
                      </Label>
                      <Input
                        id="nama_organisasi"
                        type="text"
                        placeholder="cth. RS Harapan Bunda / PMI Kota Bandung"
                        required={isOrganisasi}
                        value={form.nama_organisasi}
                        onChange={handleChange("nama_organisasi")}
                        className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="alamat_organisasi"
                        className="text-[#1F2937]/70 text-sm"
                      >
                        Alamat Organisasi
                      </Label>
                      <Input
                        id="alamat_organisasi"
                        type="text"
                        placeholder="Alamat lengkap organisasi"
                        required={isOrganisasi}
                        value={form.alamat_organisasi}
                        onChange={handleChange("alamat_organisasi")}
                        className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="telepon_organisasi"
                          className="text-[#1F2937]/70 text-sm"
                        >
                          Telepon Organisasi
                        </Label>
                        <Input
                          id="telepon_organisasi"
                          type="tel"
                          placeholder="021xxxxxxx"
                          required={isOrganisasi}
                          value={form.telepon_organisasi}
                          onChange={handleChange("telepon_organisasi")}
                          className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email_organisasi"
                          className="text-[#1F2937]/70 text-sm"
                        >
                          Email Organisasi
                        </Label>
                        <Input
                          id="email_organisasi"
                          type="email"
                          placeholder="kontak@organisasi.com"
                          required={isOrganisasi}
                          value={form.email_organisasi}
                          onChange={handleChange("email_organisasi")}
                          className="h-11 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[#1F2937]/70 text-sm">
                        Jenis Organisasi
                      </Label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setJenisOrgOpen((v) => !v)}
                          className="w-full h-11 flex items-center justify-between px-3 rounded-md border border-[#1F2937]/12 text-sm text-left transition-colors hover:bg-[#1F2937]/2 bg-white"
                        >
                          <span
                            className={
                              jenisOrganisasi
                                ? "text-[#1F2937]"
                                : "text-[#1F2937]/35"
                            }
                          >
                            {jenisOrganisasi || "Pilih jenis organisasi"}
                          </span>
                          <ChevronDown
                            className="h-4 w-4 text-[#1F2937]/40"
                            strokeWidth={1.75}
                          />
                        </button>
                        {jenisOrgOpen && (
                          <div className="absolute left-0 right-0 mt-1 rounded-md border border-[#1F2937]/10 bg-white shadow-lg z-20">
                            {JENIS_ORGANISASI_OPTIONS.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setJenisOrganisasi(option);
                                  setJenisOrgOpen(false);
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-[#1F2937]/70 hover:bg-[#1F2937]/4"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                        {/* input tersembunyi supaya required tervalidasi form native */}
                        <input
                          tabIndex={-1}
                          required={isOrganisasi}
                          value={jenisOrganisasi}
                          onChange={() => {}}
                          className="absolute inset-0 opacity-0 pointer-events-none h-0"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ==== PASSWORD — selalu tampil ==== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="password"
                    className="text-[#1F2937]/70 text-sm"
                  >
                    Kata Sandi
                  </Label>
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2937]/35 hover:text-[#1F2937]/60"
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
                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirm"
                    className="text-[#1F2937]/70 text-sm"
                  >
                    Konfirmasi
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={form.password_confirmation}
                      onChange={handleChange("password_confirmation")}
                      className="h-11 pr-10 bg-white border-[#1F2937]/12 focus-visible:ring-[#E11D2E]/30 focus-visible:border-[#E11D2E]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1F2937]/35 hover:text-[#1F2937]/60"
                      aria-label={
                        showConfirm
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                      ) : (
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded-sm border-[#1F2937]/25 accent-[#E11D2E]"
                />
                <span className="text-xs leading-relaxed text-[#1F2937]/55">
                  Saya setuju dengan{" "}
                  <Link
                    to="/terms"
                    className="text-[#E11D2E] font-medium underline underline-offset-2 hover:text-[#E11D2E]/80"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link
                    to="/privacy"
                    className="text-[#E11D2E] font-medium underline underline-offset-2 hover:text-[#E11D2E]/80"
                  >
                    Kebijakan Privasi
                  </Link>{" "}
                  LifeSource.
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
                disabled={isPending || !agreed}
                className="w-full h-11 bg-[#E11D2E] hover:bg-[#E11D2E]/90 text-white font-medium disabled:opacity-40"
              >
                {isPending ? "Membuat akun…" : "Daftar Sekarang"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#1F2937]/55">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-[#E11D2E] font-medium hover:underline underline-offset-4"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
