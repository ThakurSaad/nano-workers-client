import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";
import useAxiosPrivate from "./useAxiosPrivate";

const usePayments = () => {
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/payments/${user?.user_email}`);
      return res.data;
    },
  });
  return { payments, isLoading, refetch };
};

export default usePayments;
