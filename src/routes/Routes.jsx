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
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // worker
      {
        path: "workerHome",
        element: <WorkerHome />,
      },

      {
        path: "taskList",
        element: <TaskList />,
      },
      {
        path: "taskList/:taskId",
        element: <TaskDetails />,
      },
      {
        path: "mySubmissions",
        element: <MySubmissions />,
      },
      {
        path: "withdrawals",
        element: <Withdrawals />,
      },
      // task creator
      {
        path: "taskCreatorHome",
        element: <TaskCreatorHome />,
      },
      {
        path: "addNewTasks",
        element: <AddNewTasks />,
      },
      {
        path: "myTasks",
        element: <MyTasks />,
      },
      {
        path: "myTasks/:taskId",
        element: <UpdateTask />,
      },
      {
        path: "purchaseCoins",
        element: <PurchaseCoins />,
      },
      {
        path: "purchaseCoins/:title",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      // admin
      {
        path: "adminHome",
        element: <AdminHome />,
      },
    ],
  },
]);
