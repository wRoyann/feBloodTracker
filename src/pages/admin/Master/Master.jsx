import AdminLayout from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, Search, Building2, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useOrganisasi } from "@/hooks/useOrganisasi";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";

const statusBadge = {
  pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  active: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  rejected: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
};

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

const Master = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data, isPending: isLoadingData, isError, error } = useOrganisasi();
  const { mutate, isPending: isUpdateStatus } = useUpdateStatus();

  const filteredAccounts = data?.data
    ? data.data.filter((account) => {
        const matchesFilter = filter === "all" || account.status === filter;
        const matchesSearch =
          account.nama?.toLowerCase().includes(search.toLowerCase()) ||
          account.email?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      })
    : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Admin</h1>
          <p className="text-gray-500">
            Approve or reject organizational account registrations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Search accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-xl border border-red-200 overflow-x-auto">
          <Table className="min-w-175 md:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={14} />
                    Organization
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">Email</TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} />
                    Phone
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="w-36 whitespace-nowrap">
                  Actions
                </TableHead>
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
              ) : filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-8"
                  >
                    No accounts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#B70011]/10 flex items-center justify-center shrink-0">
                          <Building2 className="text-[#B70011]" size={14} />
                        </div>
                        <span className="truncate max-w-35 md:max-w-50">
                          {account.nama}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="truncate max-w-30 md:max-w-45 inline-block">
                        {account.email}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {account.telepon || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {account.jenis || "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge className={statusBadge[account.status] || ""}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {account.status === "pending" ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            disabled={isUpdateStatus}
                            onClick={() =>
                              mutate(
                                {
                                  id: account.id,
                                  status: "approve",
                                },
                                {
                                  onSuccess: () => {
                                    toast.success("Akun berhasil disetujui");
                                  },
                                  onError: () => {
                                    toast.error("Gagal menyetujui akun");
                                  },
                                },
                              )
                            }
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                          >
                            <CheckCircle size={14} />
                            Approve
                          </Button>
                          <Button
                            disabled={isUpdateStatus}
                            onClick={() =>
                              mutate(
                                {
                                  id: account.id,
                                  status: "rejected",
                                },
                                {
                                  onSuccess: () => {
                                    toast.success("Akun berhasil ditolak");
                                  },
                                  onError: () => {
                                    toast.error("Gagal menolak akun");
                                  },
                                },
                              )
                            }
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 text-xs h-8"
                          >
                            <XCircle size={14} />
                            Rejected
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
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

export default Master;
