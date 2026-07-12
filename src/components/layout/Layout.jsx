import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFF0EE]">
      <Navbar />
      <div className="md:ml-64 flex justify-center">
        <main className="w-full max-w-6xl px-5 pt-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
