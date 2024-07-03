import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useAllUsers from "../../../hooks/useAllUsers";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useSumFunction from "../../../hooks/useSumFunction";

const AdminHome = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user, isLoading } = useUser();
  const { users, isLoading: usersLoading } = useAllUsers();
  const sumFunction = useSumFunction();

  const { data: allPayments = [], isLoading: allPaymentsLoading } = useQuery({
    queryKey: ["allPayments", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get("/payments");
      return res.data;
    },
  });

  const totalCoins = sumFunction(allPayments, "coin_purchase");
  const totalDollars = sumFunction(allPayments, "amount");

  if (isLoading || usersLoading || allPaymentsLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Welcome Back Mr. Admin"}
          subHeading={
            "You are one of the very few users with the highest authorities in nano workers 🥳"
          }
        />
      </div>

      <div>
        <h3 className="text-xl">Available Coins</h3>
        <p className="text-gray-500 mb-4">
          You have{" "}
          <span className="text-customOrange font-semibold">{user?.coin}</span>{" "}
          coins.
        </p>

        <h3 className="text-xl">Total Users</h3>
        <p className="text-gray-500 mb-4">
          Nano workers have{" "}
          <span className="text-customOrange font-semibold">
            {users?.length}
          </span>{" "}
          users in total (e.g. workers, task creators and admins).
        </p>

        <h3 className="text-xl">Total Payments</h3>
        <p className="text-gray-500 mb-4">
          <span className="text-customOrange font-semibold">
            {allPayments.length}
          </span>{" "}
          payments in total. Task creators have bought&nbsp;
          <span className="text-customOrange font-semibold">
            {totalCoins}
          </span>{" "}
          coins amounting to{" "}
          <span className="text-customOrange font-semibold">
            {totalDollars}
          </span>{" "}
          dollars 🎉
        </p>
      </div>
    </section>
  );
};

export default AdminHome;
