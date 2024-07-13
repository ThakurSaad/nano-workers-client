import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://nano-workers-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
