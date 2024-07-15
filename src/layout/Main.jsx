import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <main className="max-w-screen-2xl mx-auto">
      <Navbar />
      <div className="pt-16 md:pt-0">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Main;
