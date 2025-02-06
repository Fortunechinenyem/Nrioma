import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto ">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
