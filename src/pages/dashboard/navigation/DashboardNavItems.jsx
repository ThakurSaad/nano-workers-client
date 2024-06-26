import {
  FaClipboardList,
  FaCoins,
  FaFileAlt,
  FaHistory,
  FaHome,
  FaHouseUser,
  FaListAlt,
  FaMoneyBillWave,
  FaPlus,
  FaTasks,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const DashboardNavItems = () => {
  const { user } = useUser();

  return (
    <>
      <li>
        <NavLink to="/">
          <FaHome className="text-lg" />
          Home
        </NavLink>
      </li>
      <li>
        {user.role === "worker" && (
          <NavLink to="/dashboard/workerHome">
            <FaHouseUser className="text-lg" />
            My Home
          </NavLink>
        )}
        {user.role === "task-creator" && (
          <NavLink to="/dashboard/taskCreatorHome">
            <FaHouseUser className="text-lg" />
            My Home
          </NavLink>
        )}
        {user.role === "admin" && (
          <NavLink to="/dashboard/adminHome">
            <FaHouseUser className="text-lg" />
            My Home
          </NavLink>
        )}
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUser className="text-lg" />
          My Profile
        </NavLink>
      </li>
      {/* worker */}
      <li>
        <NavLink to="/dashboard/taskList">
          <FaListAlt className="text-lg" />
          Task List
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/mySubmissions">
          <FaFileAlt className="text-lg" />
          My Submissions
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/withdrawals">
          <FaMoneyBillWave className="text-lg" />
          Withdrawals
        </NavLink>
      </li>
      {/* task creator */}
      <li>
        <NavLink to="/dashboard/addNewTasks">
          <FaPlus className="text-lg" />
          Add New Tasks
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myTasks">
          <FaTasks className="text-lg" />
          My Tasks
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/purchaseCoin">
          <FaCoins className="text-lg" />
          Purchase Coin
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymentHistory">
          <FaHistory className="text-lg" />
          Payment History
        </NavLink>
      </li>
      {/* admin */}
      <li>
        <NavLink to="/dashboard/manageUsers">
          <FaUserCog className="text-lg" />
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageTasks">
          <FaClipboardList className="text-lg" />
          Manage Tasks
        </NavLink>
      </li>
    </>
  );
};

export default DashboardNavItems;
