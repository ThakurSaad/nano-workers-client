import { Outlet } from "react-router-dom";
import DashboardNavItems from "../pages/dashboard/navigation/DashboardNavItems";
import Footer from "../components/Footer";
import NavbarUpper from "../pages/dashboard/navigation/NavbarUpper";

const Dashboard = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div>
        <NavbarUpper />
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative m-4 md:mx-8">
          {/* Page content */}
          <Outlet />
        </div>
        <div className="drawer-side min-h-full z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-gray-50 text-black space-y-2">
            {/* navigation  */}
            <DashboardNavItems />
          </ul>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
