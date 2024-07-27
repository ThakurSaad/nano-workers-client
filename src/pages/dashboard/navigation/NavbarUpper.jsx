import { BsList } from "react-icons/bs";
import logo from "../../../assets/nano-worker-logo.svg";
import Notification from "../common/Notification";
import NavProfile from "../common/NavProfile";

const NavbarUpper = () => {
  return (
    <section>
      <div className="navbar relative bg-gray-50 text-black">
        <div className="hidden xs:block flex-1 md:ml-5">
          <img className="w-60" src={logo} alt="logo" />
        </div>
        <div className="flex flex-grow justify-evenly xs:flex-none md:mr-5">
          {/* navbar profile */}
          <NavProfile />

          {/* navbar notification */}
          <Notification />

          {/* navigation panel button for sm device */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-neutral drawer-button lg:hidden ml-5"
          >
            <BsList />
          </label>
        </div>
      </div>
    </section>
  );
};

export default NavbarUpper;
