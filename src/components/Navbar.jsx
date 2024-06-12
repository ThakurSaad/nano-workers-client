import { Link } from "react-router-dom";
import logo from "../assets/nano-worker-logo.svg";

const Navbar = () => {
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Watch Demo</Link>
      </li>
      <li className="bg-customOrange rounded font-medium text-lg text-white lg:mr-4 my-1 lg:my-0 lg:px-4">
        <Link>Login</Link>
      </li>
      <li className="bg-customOrange rounded font-medium text-lg text-white my-1 lg:my-0 lg:px-4">
        <Link>Register</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed max-w-screen-2xl z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-36"
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
    </div>
  );
};

export default Navbar;
