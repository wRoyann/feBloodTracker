import AdminLayout from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddLocation, useLocationDonor } from "@/hooks/useLokasiDonor";
import { useDebounce } from "@/hooks/useDebounce";
import { Building2, Plus, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { getLocalStorage } from "@/utils/localStorage";

const SkeletonRow = ({ cols }) => (
  <TableRow>
    {Array.from({ length: cols }).map((_, i) => (
      <TableCell key={i}>
        <div
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === 0
              ? "w-28"
              : i === 1
                ? "w-36"
                : i === 2
                  ? "w-32"
                  : i === 3
                    ? "w-32"
                    : i === 4
                      ? "w-16"
                      : "w-20"
          }`}
        />
      </TableCell>
    ))}
  </TableRow>
);

const Locations = () => {
  const { data, isPending: isLoadingData, isError, error } = useLocationDonor();
  const { mutate: addLocation, isPending: isCreating } = useAddLocation();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredLocations = useMemo(() => {
    if (!data?.data) return [];
    if (!debouncedSearch) return data.data;
    const q = debouncedSearch.toLowerCase();
    return data.data.filter(
      (loc) =>
        loc.nama?.toLowerCase().includes(q) ||
        loc.kota?.toLowerCase().includes(q) ||
        loc.alamat?.toLowerCase().includes(q),
    );
  }, [data?.data, debouncedSearch]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    kota: "",
    telepon: "",
    jam_operasional: "",
    longitude: Number(1),
    latitude: Number(1),
    organization_id: getLocalStorage("user")?.organisasi?.id,
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLocation(form, {
      onSuccess: () => {
        toast.success("Lokasi donor berhasil ditambahkan");
        setDialogOpen(false);
        setForm({
          nama: "",
          alamat: "",
          kota: "",
          telepon: "",
          jam_operasional: "",
          longitude: "",
          latitude: "",
          organization_id: getLocalStorage("user")?.organisasi?.id,
        });
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message ||
            "Gagal menambahkan lokasi donor darah",
        );
      },
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Donor Locations
            </h1>
            <p className="text-gray-500">Manage all donor locations</p>
          </div>
          <Button
            className="bg-[#B70011] hover:bg-[#991B1B] text-white"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={16} />
            Add Location
          </Button>
        </div>

        <div className="relative max-w-sm w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kota</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Jam Operasional</TableHead>
                <TableHead className="w-12.5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingData ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={6} />
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-red-600 py-8"
                  >
                    Gagal memuat data: {error?.message || "Terjadi kesalahan"}
                  </TableCell>
                </TableRow>
              ) : !filteredLocations.length ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-8"
                  >
                    {search
                      ? "No locations match your search."
                      : "No locations found."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredLocations.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#B70011]/10 flex items-center justify-center shrink-0">
                          <Building2 className="text-[#B70011]" size={14} />
                        </div>
                        <span className="truncate max-w-35 md:max-w-50">
                          {donor.nama}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="truncate max-w-30 md:max-w-45 inline-block">
                        {donor.alamat}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {donor.kota || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {donor.telepon || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {donor.jam_operasional || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Lokasi Donor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama lokasi"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                id="alamat"
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                placeholder="Alamat lengkap"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kota">Kota</Label>
              <Input
                id="kota"
                name="kota"
                value={form.kota}
                onChange={handleChange}
                placeholder="Kota"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon">Telepon</Label>
              <Input
                id="telepon"
                name="telepon"
                value={form.telepon}
                onChange={handleChange}
                placeholder="Nomor telepon"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jam_operasional">Jam Operasional</Label>
              <Input
                id="jam_operasional"
                name="jam_operasional"
                value={form.jam_operasional}
                onChange={handleChange}
                placeholder="Contoh: 08:00 - 20:00"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="bg-[#B70011] hover:bg-[#991B1B] text-white"
              >
                {isCreating ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Locations;
