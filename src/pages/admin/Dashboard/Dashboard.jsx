import AdminLayout from "@/components/admin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Siren, MapPin, Droplets } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: <Users className="text-[#B70011]" size={24} />,
    change: "+12%",
  },
  {
    title: "Active Requests",
    value: "56",
    icon: <Siren className="text-[#B70011]" size={24} />,
    change: "+8%",
  },
  {
    title: "Donor Locations",
    value: "89",
    icon: <MapPin className="text-[#B70011]" size={24} />,
    change: "+5%",
  },
  {
    title: "Blood Units",
    value: "2,456",
    icon: <Droplets className="text-[#B70011]" size={24} />,
    change: "+3%",
  },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-red-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
