import AdminLayout from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Siren,
  Droplets,
  MapPin,
  HeartPulse,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  usePermintaanDarah,
  useCreatePermintaanDarah,
} from "@/hooks/usePermintaanDarah";
import { useDebounce } from "@/hooks/useDebounce";
import { useGolonganDarah } from "@/hooks/useGolongan";
import { useLocationDonor } from "@/hooks/useLokasiDonor";
import { getLocalStorage } from "@/utils/localStorage";

const statusColors = {
  stabil: "bg-green-100 text-green-700 border-green-200",
  menengah: "bg-yellow-100 text-yellow-700 border-yellow-200",
  mendesak: "bg-red-100 text-red-700 border-red-200",
};

const statusLabels = {
  stabil: "Stabil",
  menengah: "Menengah",
  mendesak: "Mendesak",
};

const SkeletonRow = ({ cols }) => (
  <TableRow>
    {Array.from({ length: cols }).map((_, i) => (
      <TableCell key={i}>
        <div
          className={`h-4 bg-gray-200 rounded animate-pulse ${["w-12", "w-36", "w-24", "w-28", "w-16", "w-28", "w-20", "w-16"][i] || "w-20"}`}
        />
      </TableCell>
    ))}
  </TableRow>
);

const BloodRequests = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const debouncedSearch = useDebounce(search, 300);

  const { data: allItems, isPending, isError, error } = usePermintaanDarah();
  const { mutate: createRequest, isPending: isCreating } =
    useCreatePermintaanDarah();
  const { data: golData } = useGolonganDarah();
  const { data: lokData } = useLocationDonor();

  const user = getLocalStorage("user");

  useEffect(() => {
    setPage(1);
  }, [perPage, debouncedSearch]);

  const filteredData = useMemo(() => {
    if (!allItems) return [];
    if (!debouncedSearch) return allItems;
    const q = debouncedSearch.toLowerCase();
    return allItems.filter(
      (item) =>
        item.judul?.toLowerCase().includes(q) ||
        item.golongan_darah_detail?.nama?.toLowerCase().includes(q) ||
        item.golongan_darah_detail?.kode?.toLowerCase().includes(q) ||
        item.lokasi?.nama?.toLowerCase().includes(q) ||
        item.lokasi?.kota?.toLowerCase().includes(q) ||
        item.status?.toLowerCase().includes(q),
    );
  }, [allItems, debouncedSearch]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredData.length || 0) / perPage),
  );
  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const summary = useMemo(() => {
    if (!allItems?.length) return null;
    const bloodTypes = new Set(
      allItems.map((s) => s.golongan_darah_detail?.kode),
    );
    const mendesak = allItems.filter((s) => s.status === "mendesak").length;
    return {
      total: allItems.length,
      bloodTypeCount: bloodTypes.size,
      mendesak,
      aktif: allItems.filter((s) => s.status !== "stabil").length,
    };
  }, [allItems]);

  const pages = useMemo(() => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  }, [page, totalPages]);

  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [form, setForm] = useState({
    judul: "",
    golongan_darah: "",
    lokasi_id: "",
    jumlah_dibutuhkan: "",
    batas_waktu: "",
    tujuan: "",
    kontak: "",
    deskripsi: "",
    status: "stabil",
    dibuat_oleh: user?.id || "",
    organization_id: user?.organisasi?.id || "",
  });

  const handleFormChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    createRequest(
      {
        ...form,
        lokasi_id: Number(form.lokasi_id),
        jumlah_dibutuhkan: Number(form.jumlah_dibutuhkan),
        dibuat_oleh: Number(form.dibuat_oleh),
        organization_id: Number(form.organization_id),
      },
      {
        onSuccess: () => {
          toast.success("Permintaan darurat berhasil ditambahkan");
          setAddOpen(false);
          setForm({
            judul: "",
            golongan_darah: "",
            lokasi_id: "",
            jumlah_dibutuhkan: "",
            batas_waktu: "",
            tujuan: "",
            kontak: "",
            deskripsi: "",
            status: "stabil",
            dibuat_oleh: user?.id || "",
            organization_id: user?.organisasi?.id || "",
          });
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message ||
              "Gagal menambahkan permintaan darurat",
          );
        },
      },
    );
  };

  const openDetail = (item) => {
    setDetailItem(item);
    setDetailOpen(true);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  console.log(detailItem);
  

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Permintaan Darurat
            </h1>
            <p className="text-gray-500">
              Kelola permintaan darah darurat seluruh lokasi
            </p>
          </div>
          <Button
            className="bg-[#B70011] hover:bg-[#991B1B] text-white"
            onClick={() => setAddOpen(true)}
          >
            <Plus size={16} />
            Add Request
          </Button>
        </div>

        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <Card className="border-red-200">
            <CardContent className="py-8 text-center text-red-600">
              Gagal memuat data: {error?.message || "Terjadi kesalahan"}
            </CardContent>
          </Card>
        ) : !allItems?.length ? (
          <Card className="border-red-200">
            <CardContent className="py-8 text-center text-gray-500">
              Belum ada permintaan darurat.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Permintaan
                  </CardTitle>
                  <Siren className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.total}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    permintaan terdaftar
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Permintaan Aktif
                  </CardTitle>
                  <HeartPulse className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.aktif}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    bukan status stabil
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Jenis Darah
                  </CardTitle>
                  <Droplets className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.bloodTypeCount}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    golongan darah dibutuhkan
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Darurat
                  </CardTitle>
                  <Clock className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.mendesak}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    status mendesak
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="relative max-w-sm mb-4">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Cari judul, golongan darah, lokasi, atau status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="bg-white rounded-xl border border-red-200 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">#</TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          Judul
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Droplets size={14} />
                          Golongan Darah
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          Lokasi
                        </div>
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Jumlah
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Batas Waktu
                      </TableHead>
                      <TableHead className="whitespace-nowrap">
                        Status
                      </TableHead>
                      <TableHead className="w-16 whitespace-nowrap">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isPending ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} cols={8} />
                      ))
                    ) : isError ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-red-600 py-8"
                        >
                          Gagal memuat data:{" "}
                          {error?.message || "Terjadi kesalahan"}
                        </TableCell>
                      </TableRow>
                    ) : filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-gray-500 py-8"
                        >
                          {search
                            ? "Tidak ada hasil yang cocok dengan pencarian."
                            : "Belum ada permintaan darurat."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedData.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="whitespace-nowrap text-gray-500">
                            {(page - 1) * perPage + index + 1}
                          </TableCell>
                          <TableCell className="whitespace-nowrap font-medium">
                            {item.judul || "-"}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  statusColors[item.status] ||
                                  "bg-gray-100 text-gray-700 border-gray-200"
                                }
                              >
                                {item.golongan_darah_detail?.kode ||
                                  item.golongan_darah ||
                                  "-"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {item.golongan_darah_detail?.nama || ""}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <span className="font-medium">
                              {item.lokasi?.nama || "-"}
                            </span>
                            <span className="text-xs text-gray-400 ml-1">
                              {item.lokasi?.kota || ""}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <span className="font-semibold text-gray-900">
                              {item.jumlah_dibutuhkan?.toLocaleString() || 0}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-gray-500 text-xs">
                            {formatDate(item.batas_waktu)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Badge
                              className={
                                statusColors[item.status] ||
                                "bg-gray-100 text-gray-700 border-gray-200"
                              }
                            >
                              {statusLabels[item.status] || item.status || "-"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                              onClick={() => openDetail(item)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Tampilkan</span>
                    <Select
                      value={String(perPage)}
                      onValueChange={(v) => setPerPage(Number(v))}
                    >
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="40">40</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>
                      {filteredData.length > 0
                        ? `${(page - 1) * perPage + 1}-${Math.min(page * perPage, filteredData.length)} dari ${filteredData.length}`
                        : "0 entri"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft size={14} />
                      Prev
                    </Button>
                    {pages.map((p) => (
                      <Button
                        key={p}
                        size="sm"
                        variant={p === page ? "default" : "outline"}
                        className={`h-8 min-w-8 ${p === page ? "bg-[#B70011] hover:bg-[#991B1B] text-white" : ""}`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Permintaan Darurat</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul</Label>
                <Input
                  id="judul"
                  value={form.judul}
                  onChange={(e) => handleFormChange("judul", e.target.value)}
                  placeholder="Judul permintaan"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="golongan_darah">Golongan Darah</Label>
                  <Select
                    modal={false}
                    value={form.golongan_darah}
                    onValueChange={(v) =>
                      handleFormChange("golongan_darah", v)
                    }
                  >
                    <SelectTrigger id="golongan_darah">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {golData?.data?.map((gd) => (
                        <SelectItem key={gd.kode} value={gd.kode}>
                          {gd.kode} - {gd.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jumlah_dibutuhkan">
                    Jumlah Dibutuhkan
                  </Label>
                  <Input
                    id="jumlah_dibutuhkan"
                    type="number"
                    min="1"
                    value={form.jumlah_dibutuhkan}
                    onChange={(e) =>
                      handleFormChange("jumlah_dibutuhkan", e.target.value)
                    }
                    placeholder="1"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lokasi_id">Lokasi</Label>
                  <Select
                    modal={false}
                    value={String(form.lokasi_id)}
                    onValueChange={(v) =>
                      handleFormChange("lokasi_id", v)
                    }
                  >
                    <SelectTrigger id="lokasi_id">
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {lokData?.data?.map((loc) => (
                        <SelectItem key={loc.id} value={String(loc.id)}>
                          {loc.nama} - {loc.kota}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => handleFormChange("status", v)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stabil">Stabil</SelectItem>
                      <SelectItem value="menengah">Menengah</SelectItem>
                      <SelectItem value="mendesak">Mendesak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batas_waktu">Batas Waktu</Label>
                <Input
                  id="batas_waktu"
                  type="datetime-local"
                  value={form.batas_waktu}
                  onChange={(e) =>
                    handleFormChange("batas_waktu", e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tujuan">Tujuan</Label>
                  <Input
                    id="tujuan"
                    value={form.tujuan}
                    onChange={(e) =>
                      handleFormChange("tujuan", e.target.value)
                    }
                    placeholder="Tujuan permintaan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kontak">Kontak</Label>
                  <Input
                    id="kontak"
                    value={form.kontak}
                    onChange={(e) =>
                      handleFormChange("kontak", e.target.value)
                    }
                    placeholder="Nomor kontak"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Input
                  id="deskripsi"
                  value={form.deskripsi}
                  onChange={(e) =>
                    handleFormChange("deskripsi", e.target.value)
                  }
                  placeholder="Deskripsi lengkap permintaan"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-[#B70011] hover:bg-[#991B1B] text-white"
                  disabled={isCreating}
                >
                  {isCreating ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Detail Permintaan Darurat</DialogTitle>
            </DialogHeader>
            {detailItem && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge
                    className={
                      statusColors[detailItem.status] ||
                      "bg-gray-100 text-gray-700 border-gray-200"
                    }
                  >
                    {statusLabels[detailItem.status] ||
                      detailItem.status ||
                      "-"}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    #{detailItem.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {detailItem.judul || "-"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {detailItem.deskripsi || "Tidak ada deskripsi"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-xs text-gray-400">Golongan Darah</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.golongan_darah_detail?.kode ||
                        detailItem.golongan_darah ||
                        "-"}{" "}
                      <span className="text-sm text-gray-500">
                        {detailItem.golongan_darah_detail?.nama || ""}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Jumlah Dibutuhkan</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.jumlah_dibutuhkan?.toLocaleString() || 0}{" "}
                      <span className="text-sm text-gray-500">kantong</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Lokasi</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.lokasi?.nama || "-"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {detailItem.lokasi?.kota || ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Batas Waktu</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(detailItem.batas_waktu)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Tujuan</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.tujuan || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Kontak</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.kontak || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Dibuat Oleh</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.pembuat?.name || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Organisasi</p>
                    <p className="font-medium text-gray-900">
                      {detailItem.organization?.nama ||
                        (detailItem.organization_id
                          ? `ID: ${detailItem.organization_id}`
                          : "-")}
                    </p>
                  </div>
                </div>

                {detailItem.respon?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      Respon ({detailItem.respon.length})
                    </p>
                    <div className="space-y-2">
                      {detailItem.respon.map((r) => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <span className="font-medium text-gray-900">
                            {r.pendonor?.name || "-"}
                          </span>
                          <Badge
                            className={
                              r.status === "diterima"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : r.status === "ditolak"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : "bg-yellow-100 text-yellow-700 border-yellow-200"
                            }
                          >
                            {r.status || "-"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDetailOpen(false)}
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default BloodRequests;
