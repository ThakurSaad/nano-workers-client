import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("access_token")
    navigate("/login");
  };

  return handleLogout;
};

export default useLogout;
