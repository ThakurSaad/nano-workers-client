import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosPrivate = axios.create({
  baseURL: "https://nano-workers-server.vercel.app",
});

const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      resolve(token);
    } else {
      // Optionally handle the case where the token is not immediately available
      reject("Token not found");
    }
  });
};

const useAxiosPrivate = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axiosPrivate.interceptors.request.use(
    async function (config) {
      const token = await getToken();

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

      if (status === 400 || status === 401) {
        await logout();
        navigate("/login");

        if (status === 400) {
          Swal.fire("Bad Request", "", "error");
        } else if (status === 401) {
          Swal.fire("Unauthorized Access", "", "error");
        }
      } else if (status === 403) {
        await logout();
        Swal.fire("Forbidden Access", "", "error");
      }

      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
