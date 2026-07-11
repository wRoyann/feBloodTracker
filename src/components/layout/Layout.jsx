import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <div className="">
        <Navbar />
      </div>
      <main className="bg-[#FFF0EE] min-h-screen px-5 pt-6 pb-7">
        {children}
      </main>
    </div>
  );
};

export default Layout;
