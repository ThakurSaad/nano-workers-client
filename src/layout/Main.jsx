import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto pt-16 sm:pt-20 lg:pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
