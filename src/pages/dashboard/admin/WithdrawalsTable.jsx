import { FaCheckCircle, FaCoins } from "react-icons/fa";

const WithdrawalsTable = ({ allWithdrawals, handleWithdraw }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border rounded">
        <thead>
          <tr>
            <th className="pr-0">#</th>
            <th>Approve</th>
            <th>Worker Name</th>
            <th>Worker Email</th>
            <th>Payment Number</th>
            <th>Withdraw Time</th>
            <th>Payment System</th>
            <th>Withdraw Coin</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {allWithdrawals?.map((withdrawal, index) => {
            return (
              <tr key={withdrawal._id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="btn btn-sm bg-green-700 hover:text-neutral text-white uppercase"
                    onClick={() =>
                      handleWithdraw(
                        withdrawal._id,
                        withdrawal.withdraw_coin,
                        withdrawal.worker_email
                      )
                    }
                  >
                    <FaCheckCircle className="text-lg" />
                  </button>
                </td>
                <td>{withdrawal.worker_name}</td>
                <td>{withdrawal.worker_email}</td>
                <td>{withdrawal._id}</td>
                <td className="min-w-40 px-1">{withdrawal.withdraw_time}</td>
                <td>{withdrawal.payment_system}</td>
                <td>
                  {withdrawal.withdraw_coin}
                  <FaCoins className="text-lg mx-2 inline text-customOrange" />
                </td>
                <td>${withdrawal.withdraw_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalsTable;
