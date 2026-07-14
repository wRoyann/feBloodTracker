import AdminLayout from "@/components/admin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGolonganDarah, useCreateGolonganDarah } from "@/hooks/useGolongan";
import { getLocalStorage } from "@/utils/localStorage";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SkeletonRow = ({ cols }) => (
  <TableRow>
    {Array.from({ length: cols }).map((_, i) => (
      <TableCell key={i}>
        <div
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === 0 ? "w-28" : i === 1 ? "w-36" : i === 2 ? "w-32" : "w-20"
          }`}
        />
      </TableCell>
    ))}
  </TableRow>
);

const TipeGolonganDarah = () => {
  const { data, isPending, isError, error } = useGolonganDarah();
  const { mutate: createGolongan, isPending: isCreating } =
    useCreateGolonganDarah();
  const user = getLocalStorage("user");
  const isSuperAdmin = user?.role_id === 1;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ kode: "", nama: "", deskripsi: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createGolongan(form, {
      onSuccess: () => {
        toast.success("Golongan darah berhasil ditambahkan");
        setOpen(false);
        setForm({ kode: "", nama: "", deskripsi: "" });
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || "Gagal menambahkan golongan darah",
        );
      },
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Golongan Darah</h1>
            <p className="text-gray-500">Mengelola semua golongan darah</p>
          </div>
          {isSuperAdmin && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                render={
                  <Button className="bg-[#B70011] hover:bg-[#991B1B] text-white" />
                }
              >
                <Plus size={16} />
                Add Golongan
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Golongan Darah</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="kode">Kode</Label>
                    <Input
                      id="kode"
                      name="kode"
                      value={form.kode}
                      onChange={handleChange}
                      placeholder="A+"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama</Label>
                    <Input
                      id="nama"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Golongan Darah A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Input
                      id="deskripsi"
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      placeholder="Deskripsi golongan darah"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
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
          )}
        </div>

        <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="w-12.5">
                <TableHead>Golongan</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Deskripsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={3} />
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-red-600 py-8"
                  >
                    Gagal memuat data: {error?.message || "Terjadi kesalahan"}
                  </TableCell>
                </TableRow>
              ) : data?.data?.length === 0 || !data?.data ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500 py-8"
                  >
                    Belum ada golongan darah.
                  </TableCell>
                </TableRow>
              ) : (
                data.data.map((item, index) => (
                  <TableRow key={item.kode || index}>
                    <TableCell className="font-medium">{item.kode}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.deskripsi}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TipeGolonganDarah;
