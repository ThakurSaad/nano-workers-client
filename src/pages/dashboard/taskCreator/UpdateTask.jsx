import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useTask from "../../../hooks/useTask";
import Loader from "../../../components/Loader";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UpdateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { taskId } = useParams();
  const { task, isLoading } = useTask(taskId);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { task_title, task_detail, submission_info } = task;

  const updateToDB = async (updatedTask) => {
    try {
      Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update the task?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.patch(`/task/${taskId}`, updatedTask);
          setLoading(false);
          console.log(res.data);

          if (res.data.modifiedCount) {
            Swal.fire(`Updated`, "Your task has been updated", "success");
          } else {
            Swal.fire(
              "Something went wrong",
              "You may have not updated any data.<br/>If the issue persists, please try again after hard reload (ctrl + shift + R)",
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
    const updatedTask = {
      task_title: data.task_title,
      task_detail: data.task_detail,
      submission_info: data.submission_info,
    };
    await updateToDB(updatedTask);
  };

  if (isLoading || loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Update Task"} subHeading={`Task: ${taskId}`} />
      </div>
      <div className="min-h-full bg-gray-100 flex items-center justify-center mt-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="w-full max-w-sm space-y-2 md:space-y-4">
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
                  defaultValue={task_title}
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
                  defaultValue={task_detail}
                  className="w-full border rounded p-4 h-24 "
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
                  className="block mb-2 -mt-3 text-sm font-medium text-gray-700"
                >
                  Submission Information*
                </label>
                <textarea
                  id="submission_info"
                  aria-label="submission_info"
                  defaultValue={submission_info}
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

export default UpdateTask;
