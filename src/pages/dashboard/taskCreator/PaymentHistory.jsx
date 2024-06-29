import { FaCoins } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";

const PaymentHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Payment History"}
          subHeading={"Viewing all the purchase you have completed"}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Payment Date & Time</th>
              <th>Purchased Coin</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              return (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.transactionId}</td>
                  <td className="min-w-40 px-1">{payment.current_date}</td>
                  <td>
                    <FaCoins className="text-lg mx-2 inline text-customOrange" />
                    {payment.coin_purchase}
                  </td>
                  <td>${payment.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentHistory;
