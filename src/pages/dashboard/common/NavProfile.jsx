import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import defaultDp from "../../../assets/profile.jpg";
import { FaCoins } from "react-icons/fa";

const NavProfile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(true);

  const handleIcon = () => {
    setOpen(!open);
  };
  return (
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
          className={`menu menu-sm dropdown-content mt-3 z-10 p-2 shadow-lg rounded-box w-28 bg-gray-50`}
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
  );
};

export default NavProfile;
