import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useSubmissions = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["my_submissions", user?.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/submission/${user?.email}`);
      return res.data;
    },
  });

  return { submissions, isLoading };
};

export default useSubmissions;
