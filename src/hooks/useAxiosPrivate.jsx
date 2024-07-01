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
      console.log(error.response);
      const status = error.response.status;

      if (status === 401) {
        await logout();
        navigate("/login");

        Swal.fire(`Unauthorized Access`, "", "error");
      }

      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
