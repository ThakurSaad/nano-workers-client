import { Link, NavLink } from "react-router-dom";
import logo from "../assets/nano-worker-logo.svg";
import { BsList } from "react-icons/bs";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import {
  FaBriefcase,
  FaHome,
  FaInfoCircle,
  FaPlayCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaThLarge,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();
  const handleLogOut = useLogout();

  const menuItems = (
    <>
      <li>
        <NavLink to="/">
          <FaHome className="text-lg" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/home">
          <FaPlayCircle className="text-lg" />
          Watch Demo
        </NavLink>
      </li>
      <li>
        <a target="_blank" href="https://thakur-saad.web.app/">
          <FaBriefcase className="text-lg" />
          Portfolio
        </a>
      </li>
      <li>
        <NavLink to="/aboutUs">
          <FaInfoCircle className="text-lg" />
          About Us
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard">
              <FaThLarge className="text-lg" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">
              <FaSignInAlt className="text-lg" /> Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <FaUserPlus className="text-lg" />
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav>
      <div className="navbar fixed font-extrabold max-w-screen-2xl z-10 bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <BsList className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-36 bg-orange-50"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/">
            <img className="w-60" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-base menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
