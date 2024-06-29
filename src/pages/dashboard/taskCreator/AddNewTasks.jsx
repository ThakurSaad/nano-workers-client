import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle";
import useDateTime from "../../../hooks/useDateTime";
import { useState } from "react";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";

const AddNewTasks = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(false);
  const convertedDateTime = useDateTime(dateStr);
  const currentDateTime = useDateTime();
  const axiosPrivate = useAxiosPrivate();
  const { user, refetch } = useUser();

  const handleInputChange = (event) => {
    setDateStr(event.target.value);
  };

  const saveTaskToDB = async (task) => {
    try {
      Swal.fire({
        title: "Are you sure you want to add the task?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.post("/task", task);
          setLoading(false);
          reset();

          if (res.data.insertedId) {
            refetch();
            Swal.fire(
              `Successful!`,
              `Task id ${res.data.insertedId}`,
              "success"
            );
          } else {
            Swal.fire(
              "Something went wrong.",
              "Please try again after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const {
      task_title,
      submission_info,
      task_detail,
      task_count,
      payable_amount,
    } = data;
    const needCoin = task_count * payable_amount;

    if (user?.coin < needCoin) {
      Swal.fire({
        icon: "error",
        title: "Request Rejected",
        text: `Not enough coins. You need total ${needCoin} coins`,
        footer:
          '<a href="/dashboard/purchaseCoins" style="color: #007bff; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Purchase coins?</a>',
        showCloseButton: true,
        showConfirmButton: false,
      });
    } else {
      const task = {
        task_title,
        submission_info,
        task_detail,
        task_count: Math.floor(parseInt(task_count)),
        payable_amount: Math.floor(parseInt(payable_amount)),
        completion_date: convertedDateTime,
        current_time: currentDateTime,
        creator_email: user?.user_email,
        creator_name: user?.display_name,
      };

      await saveTaskToDB(task);
    }
  };

  if (loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Add New Task"} />
      </div>
      <div className="min-h-full bg-gray-100 flex items-center justify-center mt-4">
        <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded shadow-md m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="md:flex md:gap-8">
              <div className="w-full space-y-2 md:space-y-4">
                <div>
                  <label
                    htmlFor="task_title"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Task Title*
                  </label>
                  <input
                    id="task_title"
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
                  <label
                    htmlFor="task_detail"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Task Detail*
                  </label>
                  <textarea
                    id="task_detail"
                    aria-label="task_detail"
                    placeholder="Enter details here"
                    className="w-full border rounded p-4 h-24"
                    {...register("task_detail", {
                      required: {
                        value: true,
                        message: "Detail is required",
                      },
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
                  <label
                    htmlFor="submission_info"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Submission Information*
                  </label>
                  <textarea
                    id="submission_info"
                    aria-label="submission_info"
                    placeholder="What to submit?"
                    className="w-full border rounded p-4 h-24"
                    {...register("submission_info", {
                      required: {
                        value: true,
                        message: "Submission information is required",
                      },
                    })}
                  />
                  <div className="label">
                    {errors.submission_info?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.submission_info.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full space-y-2 md:space-y-4">
                <div>
                  <label
                    htmlFor="task_count"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Task Count*
                  </label>
                  <input
                    id="task_count"
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Enter task count"
                    {...register("task_count", {
                      required: {
                        value: true,
                        message: "Task count is required",
                      },
                    })}
                  />
                  <div className="label">
                    {errors.task_count?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.task_count.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="payable_amount"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Payable Amount (per task)*
                  </label>
                  <input
                    id="payable_amount"
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Enter payable amount"
                    {...register("payable_amount", {
                      required: {
                        value: true,
                        message: "Payable amount is required",
                      },
                    })}
                  />
                  <div className="label">
                    {errors.payable_amount?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.payable_amount.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="completion_date"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Deadline*
                  </label>
                  <input
                    id="completion_date"
                    type="date"
                    className="input input-bordered w-full"
                    placeholder="Enter date"
                    {...register("completion_date", {
                      onChange: handleInputChange,
                      required: {
                        value: true,
                        message: "Deadline is required",
                      },
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        if (selectedDate < currentDate) {
                          return "Please select a future date";
                        }
                        return true;
                      },
                    })}
                  />
                  <div className="label">
                    {errors.completion_date?.type === "required" ? (
                      <span className="label-text-alt text-red-500">
                        {errors.completion_date.message}
                      </span>
                    ) : (
                      <span className="label-text-alt text-red-500">
                        {errors.completion_date?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <input
                className="btn bg-gradient-to-r from-customOrange to-[#ffb347] uppercase text-white border-0 w-full"
                type="submit"
                value="Add Task"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewTasks;
