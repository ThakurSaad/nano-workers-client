import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useTask = (taskId) => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["task", taskId, user?.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/task/${taskId}`);
      return res.data;
    },
  });

  return { task, isLoading };
};

export default useTask;
