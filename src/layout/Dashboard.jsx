import { Outlet } from "react-router-dom";
import DashboardNavItems from "../pages/dashboard/navigation/DashboardNavItems";
import Footer from "../components/Footer";
import NavbarUpper from "../pages/dashboard/navigation/NavbarUpper";

const Dashboard = () => {
  return (
    <section>
      <NavbarUpper />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content m-2 lg:m-4">
          {/* Page content */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-orange-50 text-black space-y-2">
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
