import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user: firebaseUser } = useAuth();

  const { data: user = {}, refetch } = useQuery({
    queryKey: ["user", firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/user/${firebaseUser?.email}`);
      return res.data;
    },
    enabled: !!firebaseUser?.email,
  });

  return { user, refetch };
};

export default useUser;
