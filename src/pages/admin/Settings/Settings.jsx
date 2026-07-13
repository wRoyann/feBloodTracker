import AdminLayout from "@/components/admin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import { removeLocalStorage } from "@/utils/localStorage";

const Settings = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(null, {
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
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage system settings</p>
        </div>

        <Card className="border-red-200 max-w-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Application Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input id="app-name" defaultValue="BloodTracker" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-email">Contact Email</Label>
              <Input
                id="app-email"
                type="email"
                defaultValue="admin@bloodtracker.com"
              />
            </div>
            <Button className="bg-[#B70011] hover:bg-[#991B1B] text-white">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-200 max-w-2xl md:hidden">
          <CardContent className="pt-6">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Settings;
