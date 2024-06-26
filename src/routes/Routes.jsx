import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../layout/Dashboard";
import MySubmissions from "../pages/dashboard/MySubmissions";
import Withdrawals from "../pages/dashboard/Withdrawals";
import Profile from "../pages/dashboard/Profile";
import TaskList from "../pages/dashboard/tasklist/TaskList";
import TaskDetails from "../pages/dashboard/tasklist/TaskDetails";
import WorkerHome from "../pages/dashboard/home/WorkerHome";
import TaskCreatorHome from "../pages/dashboard/home/TaskCreatorHome";
import AdminHome from "../pages/dashboard/home/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
      {
        path: "workerHome",
        element: <WorkerHome />,
      },
      {
        path: "taskCreatorHome",
        element: <TaskCreatorHome />,
      },
      {
        path: "adminHome",
        element: <AdminHome />,
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
    ],
  },
]);
