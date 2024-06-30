import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useAllUsers = () => {
  const axiosPrivate = useAxiosPrivate();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/users");
      return res.data;
    },
  });

  return { users, isLoading, refetch };
};

export default useAllUsers;
