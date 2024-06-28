import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useTask = (taskId) => {
  const axiosPrivate = useAxiosPrivate();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/task/${taskId}`);
      return res.data;
    },
  });

  return { task, isLoading };
};

export default useTask;
