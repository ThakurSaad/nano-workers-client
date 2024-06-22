import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../layout/Dashboard";
import TaskList from "../pages/dashboard/TaskList";
import MySubmissions from "../pages/dashboard/MySubmissions";
import Withdrawals from "../pages/dashboard/Withdrawals";

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
        path: "taskList",
        element: <TaskList />,
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
