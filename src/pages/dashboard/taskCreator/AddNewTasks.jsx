import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";

const AddNewTasks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <section>
      <div>
        <SectionTitle heading={"Add New Task"} />
      </div>
      <div className="min-h-full bg-gray-100 flex items-center justify-center mt-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Task Title*
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter title"
                {...register("task_title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
              />
              <div className="label">
                {errors.task_title?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.task_title.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Task Detail
              </label>
              <textarea
                aria-label="task_detail"
                placeholder="Enter details here"
                className="w-full border rounded p-4 h-24"
                {...register("task_detail", {
                  required: { value: true, message: "Detail is required" },
                })}
              />
              <div className="label">
                {errors.task_detail?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.task_detail.message}
                  </span>
                )}
              </div>
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
    </section>
  );
};

export default AddNewTasks;
