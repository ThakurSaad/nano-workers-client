import { FaCoins, FaExternalLinkAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import usePayments from "../../../hooks/usePayments";

const PaymentHistory = () => {
  const { payments, isLoading } = usePayments();

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
      {payments.length ? (
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
      ) : (
        <p className="text-gray-500">
          You have not purchased any coins. Go to &nbsp;
          <Link
            className="text-blue-600 hover:underline"
            to="/dashboard/purchaseCoins"
          >
            Purchase Coins <FaExternalLinkAlt className="inline text-sm" />{" "}
          </Link>{" "}
          and select the package fitted for you.
        </p>
      )}
    </section>
  );
};

export default PaymentHistory;
