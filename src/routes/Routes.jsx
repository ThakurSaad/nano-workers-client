import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../layout/Dashboard";
import MySubmissions from "../pages/dashboard/worker/MySubmissions";
import Withdrawals from "../pages/dashboard/worker/Withdrawals";
import Profile from "../pages/dashboard/common/Profile";
import WorkerHome from "../pages/dashboard/worker/WorkerHome";
import TaskCreatorHome from "../pages/dashboard/taskCreator/TaskCreatorHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import TaskDetails from "../pages/dashboard/worker/TaskDetails";
import TaskList from "../pages/dashboard/worker/TaskList";
import AddNewTasks from "../pages/dashboard/taskCreator/AddNewTasks";
import MyTasks from "../pages/dashboard/taskCreator/MyTasks";
import PaymentHistory from "../pages/dashboard/taskCreator/PaymentHistory";
import UpdateTask from "../pages/dashboard/taskCreator/UpdateTask";
import PurchaseCoins from "../pages/dashboard/taskCreator/payment/PurchaseCoins";
import Payment from "../pages/dashboard/taskCreator/payment/Payment";
import ErrorPage from "../pages/error/ErrorPage";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageTasks from "../pages/dashboard/admin/ManageTasks";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ForbiddenPage from "../pages/error/ForbiddenPage";
import AllNotifications from "../pages/dashboard/common/AllNotifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "403",
    element: <ForbiddenPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "allNotifications",
        element: (
          <PrivateRoute>
            <AllNotifications />
          </PrivateRoute>
        ),
      },

      // worker
      {
        path: "workerHome",
        element: (
          <PrivateRoute>
            <WorkerHome />
          </PrivateRoute>
        ),
      },

      {
        path: "taskList",
        element: (
          // <PrivateRoute>
          <TaskList />
          // </PrivateRoute>
        ),
      },
      {
        path: "taskList/:taskId",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "mySubmissions",
        element: (
          <PrivateRoute>
            <MySubmissions />
          </PrivateRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <PrivateRoute>
            <Withdrawals />
          </PrivateRoute>
        ),
      },

      // task creator
      {
        path: "taskCreatorHome",
        element: (
          <PrivateRoute>
            <TaskCreatorHome />
          </PrivateRoute>
        ),
      },
      {
        path: "addNewTasks",
        element: (
          <PrivateRoute>
            <AddNewTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "myTasks",
        element: (
          <PrivateRoute>
            <MyTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "myTasks/:taskId",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
      },
      {
        path: "purchaseCoins",
        element: (
          <PrivateRoute>
            <PurchaseCoins />
          </PrivateRoute>
        ),
      },
      {
        path: "purchaseCoins/:title",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },

      // admin
      {
        path: "adminHome",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageTasks",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageTasks />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
