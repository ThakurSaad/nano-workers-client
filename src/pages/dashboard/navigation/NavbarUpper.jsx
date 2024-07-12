import { BsList } from "react-icons/bs";
import logo from "../../../assets/nano-worker-logo.svg";
import { FaCoins } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import useUser from "../../../hooks/useUser";
import defaultDp from "../../../assets/profile.jpg";
import { useState } from "react";
import Notification from "../common/Notification";

const NavbarUpper = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(true);

  const handleIcon = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="navbar relative bg-orange-50 text-black">
        <div className="hidden xs:block flex-1 md:ml-5">
          <img className="w-60" src={logo} alt="logo" />
        </div>
        <div className="flex flex-grow justify-evenly xs:flex-none md:mr-5">
          {/* profile */}
          <div className="dropdown -mb-2">
            <div onClick={handleIcon} className="avatar">
              {!open ? (
                <div className="absolute z-50 bg-transparent w-7 h-7 p-0 m-0 right-0 top-0 -mt-1 -mr-5">
                  <IoIosArrowDropdown className="text-xl text-orange-600" />
                </div>
              ) : (
                <div className="absolute z-50 bg-transparent w-7 h-7 p-0 m-0 right-0 top-0 -mt-1 -mr-5">
                  <IoIosArrowDropup className="text-xl text-orange-600" />
                </div>
              )}
              <div
                className="border-2 border-gray-200 hover:scale-105 duration-75 hover:cursor-pointer w-12 sm:w-14 rounded-full"
                tabIndex={2}
              >
                <img src={user?.photo_url ? user.photo_url : defaultDp} />
              </div>
            </div>
            {!open ? (
              <ul
                tabIndex={2}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-28 bg-orange-50`}
              >
                <small className="text-sm text-customOrange">
                  {user.display_name}
                </small>
                <small className="text-sm">{user.role}</small>
                <small className="text-sm flex flex-row">
                  {user.coin}
                  <span>
                    <FaCoins className="pl-2 text-2xl" />
                  </span>
                </small>
              </ul>
            ) : (
              ""
            )}
          </div>

          {/* notification */}
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
    </div>
  );
};

export default NavbarUpper;
