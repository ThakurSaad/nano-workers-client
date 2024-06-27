import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import useUser from "../../../hooks/useUser";
import { useState } from "react";
import Swal from "sweetalert2";
import useCurrentDateTime from "../../../hooks/useCurrentDateTime";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";

const Withdrawals = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
  const { display_name, user_email, coin } = user;
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const currentDateTime = useCurrentDateTime();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const maxWithdrawalAmount = Math.round(parseFloat(coin / 20));

  const saveWithdrawToDB = async (withdraw) => {
    try {
      Swal.fire({
        title: "Confirm withdraw?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.post("/withdraw", withdraw);
          setLoading(false);

          if (res.data.insertedId) {
            reset();
            setValue("withdraw_amount", 0);

            Swal.fire("Withdraw Successful!", "", "success");
          }
        }
      });
    } catch (err) {
      setLoading(false);

      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.message}. Please try again`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const withdrawCoinAmount = event.target.value;
    const amount = Math.round(parseFloat(withdrawCoinAmount / 20));
    setWithdrawAmount(amount);
    setValue("withdraw_amount", amount);
  };

  const onSubmit = async (data) => {
    const { withdraw_coin, withdraw_amount, payment_system } = data;

    if (withdraw_amount > maxWithdrawalAmount) {
      Swal.fire({
        icon: "error",
        title: "Request Rejected",
        text: "You can't withdraw more than maximum withdrawal amount!",
      });
    } else {
      const withdraw = {
        worker_email: user_email,
        worker_name: display_name,
        withdraw_coin,
        withdraw_amount,
        payment_system,
        withdraw_time: currentDateTime,
      };

      await saveWithdrawToDB(withdraw);
    }
  };

  if (loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Withdrawals"} />
      </div>
      <div>
        <div>
          <h3 className="text-xl">Coins</h3>
          <p className="text-gray-500">
            You have <span>{coin}</span> coins. 1 dollar = 20 coins
          </p>
          <h3 className="text-xl mt-4">Maximum Withdrawal Amount</h3>
          <p className="text-gray-500 mb-4">
            You can currently withdraw{" "}
            <strong className="text-customOrange">
              ${maxWithdrawalAmount}
            </strong>
          </p>
          <hr />
        </div>
        <div className="min-h-full bg-gray-100 flex items-center justify-center mt-4">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md m-4">
            <h2 className="text-2xl font-bold text-center">Withdrawal Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Coins To Withdraw*
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Enter amount"
                  {...register("withdraw_coin", {
                    onChange: handleInputChange,
                    required: {
                      value: true,
                      message: "Amount is required",
                    },
                  })}
                />
                <div className="label">
                  {errors.withdraw_coin?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.withdraw_coin.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Withdrawal Amount ($)
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-gray-100 mb-2"
                  {...register("withdraw_amount")}
                  value={withdrawAmount}
                  readOnly
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Payment System*
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("payment_system", {
                    required: {
                      value: true,
                      message: "Select payment system",
                    },
                  })}
                >
                  <option value="">Select method</option>
                  <option value="bkash">Bkash</option>
                  <option value="rocket">Rocket</option>
                  <option value="nagad">Nagad</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
                <div className="label">
                  {errors.payment_system?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.payment_system.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Number*
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter account details"
                  {...register("account_number", {
                    required: {
                      value: true,
                      message: "Account number is required",
                    },
                  })}
                />
                <div className="label">
                  {errors.account_number?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.account_number.message}
                    </span>
                  )}
                </div>
              </div>

              <input
                className="btn bg-gradient-to-r from-customOrange to-[#ffb347] uppercase text-white border-0 w-full mt-3"
                type="submit"
                value="withdraw"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawals;
