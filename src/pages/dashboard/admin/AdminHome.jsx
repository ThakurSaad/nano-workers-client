import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useAllUsers from "../../../hooks/useAllUsers";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useSumFunction from "../../../hooks/useSumFunction";
import WithdrawalsTable from "./WithdrawalsTable";
import { useState } from "react";
import Swal from "sweetalert2";

const AdminHome = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const { users, isLoading: usersLoading } = useAllUsers();
  const sumFunction = useSumFunction();

  const { data: allPayments = [], isLoading: allPaymentsLoading } = useQuery({
    queryKey: ["allPayments", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get("/payments");
      return res.data;
    },
  });

  const {
    data: allWithdrawals = [],
    isLoading: allWithdrawalsLoading,
    refetch,
  } = useQuery({
    queryKey: ["allWithdrawals", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get("/withdraw");
      return res.data;
    },
  });

  const totalCoins = sumFunction(allPayments, "coin_purchase");
  const totalDollars = sumFunction(allPayments, "amount");

  const withdrawToDB = async (data) => {
    try {
      console.log(data);
      Swal.fire({
        title: "Confirm Approval",
        text: `Confirming withdrawal request of ${data.worker_email} for ${data.withdraw_coin} coins`,
        showCancelButton: true,
        icon: "question",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.delete("/withdraw", { data: data });
          console.log(res.data);
          setLoading(false);
          refetch();

          if (res.data.deletedCount) {
            Swal.fire(
              "Successful",
              `You have approved the withdrawal request.<br/>The withdrawal information has been deleted from Database.<br/>${data.withdraw_coin} coins have been deducted from the workers account. <br/>The worker will be notified shortly.`,
              "success"
            );
          } else {
            Swal.fire(
              "Something went wrong",
              "If this issue persist please try again after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleWithdraw = async (withdraw_id, withdraw_coin, worker_email) => {
    const data = { withdraw_id, withdraw_coin, worker_email };
    await withdrawToDB(data);
  };

  if (
    loading ||
    isLoading ||
    usersLoading ||
    allPaymentsLoading ||
    allWithdrawalsLoading
  ) {
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

        <h3 className="text-xl">Withdrawal Request</h3>
        {allWithdrawals.length ? (
          <>
            <p className="text-gray-500 mb-4">
              You have&nbsp;
              <span className="text-customOrange font-semibold">
                {allWithdrawals.length}
              </span>
              &nbsp;pending withdrawals to approve.
            </p>
          </>
        ) : (
          <p className="text-gray-500 mb-4">
            Currently you have no pending withdrawal requests to review.
          </p>
        )}
      </div>

      {allWithdrawals.length && (
        <WithdrawalsTable
          allWithdrawals={allWithdrawals}
          handleWithdraw={handleWithdraw}
        />
      )}
    </section>
  );
};

export default AdminHome;
