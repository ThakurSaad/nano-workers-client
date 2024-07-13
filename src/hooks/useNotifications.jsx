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
      // console.log(res.data); // shows array of objects as expected
      return res.data;
    },
    enabled: !!user?.user_email,
  });
  // console.log(notifications); // shows the string [object object]. also shows array of objects as expected. both is showing
  return { notifications, isLoading, refetch };
};

export default useNotifications;
