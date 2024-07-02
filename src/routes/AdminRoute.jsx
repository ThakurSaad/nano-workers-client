import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import useUser from "../hooks/useUser";
import Swal from "sweetalert2";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  if (user.role === "admin") {
    return children;
  }

  if (user.role !== "admin") {
    Swal.fire("Forbidden Access", `Login with admin account`, "error");
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
