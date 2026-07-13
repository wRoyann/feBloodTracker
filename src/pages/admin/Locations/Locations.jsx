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
import { Plus } from "lucide-react";

const Locations = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Donor Locations
            </h1>
            <p className="text-gray-500">
              Manage all donor locations
            </p>
          </div>
          <Button className="bg-[#B70011] hover:bg-[#991B1B] text-white">
            <Plus size={16} />
            Add Location
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Input placeholder="Search locations..." className="max-w-sm" />
        </div>

        <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No locations found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Locations;
