import { BsList } from "react-icons/bs";
import logo from "../../../assets/nano-worker-logo.svg";
import { FaBell, FaCoins } from "react-icons/fa";

const NavbarUpper = () => {
  return (
    <div>
      <div className="navbar bg-orange-50 text-black">
        <div className="hidden xs:block flex-1 md:ml-5">
          <img className="w-60" src={logo} alt="logo" />
        </div>
        <div className="flex flex-grow justify-evenly xs:flex-none md:mr-5">
          <div className="dropdown -mb-2">
            <div className="avatar">
              <div
                className="hover:cursor-pointer w-12 rounded-xl"
                tabIndex={2}
              >
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul
              tabIndex={2}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-28 bg-orange-50`}
            >
              <small className="text-sm">Natasha</small>
              <small className="text-sm">Admin</small>
              <small className="text-sm flex flex-row">
                300
                <span>
                  <FaCoins className="pl-2 text-2xl" />
                </span>
              </small>
            </ul>
          </div>
          <div>
            <button className="btn btn-neutral ml-5">
              <FaBell className="text-xl" />
              <div className="badge badge-secondary">+99</div>
            </button>
          </div>
          {/* navigation panel button for sm device */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-neutral drawer-button lg:hidden ml-5"
          >
            <BsList />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavbarUpper;
