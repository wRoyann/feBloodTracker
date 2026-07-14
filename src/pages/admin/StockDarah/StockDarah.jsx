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
  Droplets,
  MapPin,
  Package,
  Building2,
  HeartPulse,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { useStockDarah, useUpdateStockDarah } from "@/hooks/useStockDarah";
import { useDebounce } from "@/hooks/useDebounce";

const bloodTypeColors = {
  A: "bg-red-100 text-red-700 border-red-200",
  B: "bg-blue-100 text-blue-700 border-blue-200",
  AB: "bg-purple-100 text-purple-700 border-purple-200",
  O: "bg-green-100 text-green-700 border-green-200",
};

const SkeletonRow = ({ cols }) => (
  <TableRow>
    {Array.from({ length: cols }).map((_, i) => (
      <TableCell key={i}>
        <div
          className={`h-4 bg-gray-200 rounded animate-pulse ${["w-28", "w-36", "w-24", "w-16"][i] || "w-20"}`}
        />
      </TableCell>
    ))}
  </TableRow>
);

const StockDarah = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const debouncedSearch = useDebounce(search, 300);

  const { data: allItems, isPending, isError, error } = useStockDarah();

  useEffect(() => {
    setPage(1);
  }, [perPage, debouncedSearch]);

  const filteredData = useMemo(() => {
    if (!allItems) return [];
    if (!debouncedSearch) return allItems;
    const q = debouncedSearch.toLowerCase();
    return allItems.filter(
      (item) =>
        item.golongan_darah?.nama?.toLowerCase().includes(q) ||
        item.lokasi_donor?.nama?.toLowerCase().includes(q) ||
        item.lokasi_donor?.kota?.toLowerCase().includes(q),
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
    const bloodTypes = new Set(allItems.map((s) => s.golongan_darah?.kode));
    const locations = new Set(allItems.map((s) => s.lokasi_donor?.id));
    const orgs = new Set(allItems.map((s) => s.organization_id));
    const totalUnits = allItems.reduce((sum, s) => sum + (s.jumlah || 0), 0);
    return {
      bloodTypeCount: bloodTypes.size,
      locationCount: locations.size,
      orgCount: orgs.size,
      totalUnits,
    };
  }, [allItems]);

  const perBloodType = useMemo(() => {
    if (!allItems) return [];
    const map = {};
    allItems.forEach((s) => {
      const kode = s.golongan_darah?.kode || "Unknown";
      if (!map[kode]) {
        map[kode] = {
          kode,
          nama: s.golongan_darah?.nama || kode,
          total: 0,
          locations: new Set(),
        };
      }
      map[kode].total += s.jumlah || 0;
      if (s.lokasi_donor?.id) map[kode].locations.add(s.lokasi_donor.id);
    });
    return Object.values(map).map((g) => ({
      ...g,
      locationCount: g.locations.size,
    }));
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editJumlah, setEditJumlah] = useState("");
  const { mutate: updateStock, isPending: isUpdating } = useUpdateStockDarah();

  const openEditDialog = (item) => {
    setEditItem(item);
    setEditJumlah(String(item.jumlah || 0));
    setDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateStock(
      {
        id: editItem.id,
        golongan_darah_kode: editItem.golongan_darah_kode,
        lokasi_id: editItem.lokasi_id,
        jumlah: Number(editJumlah),
      },
      {
        onSuccess: () => {
          toast.success("Stok darah berhasil diperbarui");
          setDialogOpen(false);
          setEditItem(null);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || "Gagal memperbarui stok darah",
          );
        },
      },
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Darah</h1>
          <p className="text-gray-500">Overview stok darah seluruh lokasi</p>
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
              Belum ada data stok darah.
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Jenis Darah
                  </CardTitle>
                  <HeartPulse className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.bloodTypeCount}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    jenis golongan darah
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Lokasi
                  </CardTitle>
                  <MapPin className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.locationCount}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">lokasi donor</p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Stok
                  </CardTitle>
                  <Package className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.totalUnits.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">unit darah</p>
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Organisasi
                  </CardTitle>
                  <Building2 className="text-[#B70011]" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {summary.orgCount}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    organisasi terdaftar
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {perBloodType.map((bt) => (
                <Card key={bt.kode} className="border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="text-[#B70011]" size={18} />
                      <Badge
                        className={
                          bloodTypeColors[bt.kode] ||
                          "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {bt.kode}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {bt.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bt.nama} &middot; {bt.locationCount} lokasi
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <div className="relative max-w-sm mb-4">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  placeholder="Cari golongan darah, lokasi, atau kota..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="bg-white rounded-xl border border-red-200 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
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
                      <TableHead className="whitespace-nowrap">Kota</TableHead>
                      <TableHead className="whitespace-nowrap">
                        Jumlah
                      </TableHead>
                      <TableHead className="w-24 whitespace-nowrap">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isPending ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} cols={5} />
                      ))
                    ) : isError ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-red-600 py-8"
                        >
                          Gagal memuat data:{" "}
                          {error?.message || "Terjadi kesalahan"}
                        </TableCell>
                      </TableRow>
                    ) : filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-gray-500 py-8"
                        >
                          {search
                            ? "Tidak ada hasil yang cocok dengan pencarian."
                            : "Belum ada data stok darah."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  bloodTypeColors[item.golongan_darah?.kode] ||
                                  "bg-gray-100 text-gray-700 border-gray-200"
                                }
                              >
                                {item.golongan_darah?.kode || "-"}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {item.golongan_darah?.nama || ""}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap font-medium">
                            {item.lokasi_donor?.nama || "-"}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-gray-500">
                            {item.lokasi_donor?.kota || "-"}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <span className="font-semibold text-gray-900">
                              {item.jumlah?.toLocaleString() || 0}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs gap-1"
                              onClick={() => openEditDialog(item)}
                            >
                              <Pencil size={14} />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

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
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Stok Darah</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  {editItem && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge
                          className={
                            bloodTypeColors[editItem.golongan_darah?.kode] ||
                            "bg-gray-100 text-gray-700 border-gray-200"
                          }
                        >
                          {editItem.golongan_darah?.kode || "-"}
                        </Badge>
                        <span>{editItem.lokasi_donor?.nama || "-"}</span>
                        <span className="text-gray-400">
                          {editItem.lokasi_donor?.kota || ""}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-jumlah">Jumlah</Label>
                        <Input
                          id="edit-jumlah"
                          type="number"
                          min="0"
                          value={editJumlah}
                          onChange={(e) => setEditJumlah(e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
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
                      className="bg-[#B70011] hover:bg-[#991B1B] text-white"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default StockDarah;
