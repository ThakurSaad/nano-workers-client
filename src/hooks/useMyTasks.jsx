import useUser from "./useUser";
import useAxiosPrivate from "./useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const useMyTasks = () => {
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: myTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTasks", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/myTasks/${user?.user_email}`);
      const myTasks = res.data.sort(
        (a, b) => new Date(b.current_time) - new Date(a.current_time)
      );
      return myTasks;
    },
  });
  return { myTasks, isLoading, refetch };
};

export default useMyTasks;
