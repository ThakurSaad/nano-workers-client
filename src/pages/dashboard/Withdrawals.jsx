import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import useUser from "../../hooks/useUser";

const Withdrawals = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
  const { display_name, user_email, coin } = user;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <section>
      <div>
        <SectionTitle heading={"Withdrawals"} />
      </div>
      <div>
        <div className="min-h-full bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md m-4">
            <h2 className="text-2xl font-bold text-center">Withdrawal Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Withdrawal Amount
                </label>
                <input
                  type="number"
                  className={`input input-bordered w-full ${
                    errors.amount ? "input-error" : ""
                  }`}
                  {...register("amount")}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Withdrawal Method
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.method ? "select-error" : ""
                  }`}
                  {...register("method")}
                >
                  <option value="none">Select method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
                {errors.method && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.method.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Details
                </label>
                <textarea
                  className={`textarea textarea-bordered w-full ${
                    errors.accountDetails ? "textarea-error" : ""
                  }`}
                  {...register("accountDetails")}
                  placeholder="Enter account details"
                ></textarea>
                {errors.accountDetails && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.accountDetails.message}
                  </p>
                )}
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
