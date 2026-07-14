import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFF0EE]">
      <AdminSidebar />
      <div className="ml-16 md:ml-64 flex justify-center">
        <main className="w-full max-w-7xl px-5 pt-6 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
