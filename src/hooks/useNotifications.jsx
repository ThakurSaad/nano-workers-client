import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import useAxiosPrivate from "./useAxiosPrivate";

const useNotifications = () => {
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/notification/${user?.user_email}`);
      return res.data;
    },
    enabled: !!user?.user_email,
  });

  return { notifications, isLoading, refetch };
};

export default useNotifications;
