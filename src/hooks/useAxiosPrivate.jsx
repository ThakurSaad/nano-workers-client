import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPrivate = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axiosPrivate.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access_token");
      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      console.log(status);

      if (status === 400 || status === 401 || status === 403) {
        await logout();
        navigate("/login");

        if (status === 400) {
          Swal.fire("Bad Request", "", "error");
        } else if (status === 401) {
          Swal.fire("Unauthorized Access", "", "error");
        } else if (status === 403) {
          Swal.fire("Forbidden Access", "", "error"); 
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
