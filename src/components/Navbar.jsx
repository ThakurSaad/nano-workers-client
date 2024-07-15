import { Link } from "react-router-dom";
import logo from "../assets/nano-worker-logo.svg";
import { BsList } from "react-icons/bs";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const handleLogOut = useLogout();

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Watch Demo</Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="bg-customOrange rounded font-medium text-lg text-white lg:mr-4 my-1 lg:my-0 lg:px-4">
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li className="bg-customOrange rounded font-medium text-lg text-white lg:mr-4 my-1 lg:my-0 lg:px-4">
            <Link to="/login">Login</Link>
          </li>
          <li className="bg-customOrange rounded font-medium text-lg text-white my-1 lg:my-0 lg:px-4">
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav>
      <div className="navbar fixed max-w-screen-2xl z-10 bg-white">
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
          <Link>
            <img className="w-60" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center xl:navbar-end hidden lg:flex">
          <ul className="menu text-lg menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
