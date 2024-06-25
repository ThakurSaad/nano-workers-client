import {
  FaRegCalendarAlt,
  FaRegClock,
  FaRegListAlt,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import profile from "../../../assets/profile.png";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";

const DetailsAndSubmissionForm = ({
  _id,
  task_title,
  task_detail,
  task_count,
  submission_info,
  published_date,
  completion_date,
  payable_amount,
  creator_name,
  creator_email,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  if (loading) {
    return <Loader height="min-h-screen" />;
  }

  const saveSubmission = async (submission) => {
    try {
      const res = await axiosPrivate.post("/submission", submission);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your submission has been sent to the client. Please wait for confirmation.",
          showConfirmButton: false,
          timer: 5000,
        });
      }
    } catch (err) {
      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${err.message}. Please try again`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const onSubmit = async (data) => {
    function getCurrentDate() {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return new Date().toLocaleDateString("en-US", options);
    }
    try {
      setLoading(true);
      const submission = {
        task_id: _id,
        task_title,
        task_detail,
        payable_amount,
        worker_email: user.email,
        submission_details: data.submission_details,
        worker_name: user.displayName,
        creator_name,
        creator_email,
        current_date: getCurrentDate(),
        status: "pending",
      };

      await saveSubmission(submission);
    } catch (err) {
      console.log(err);
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="md:flex md:justify-between gap-5">
      <div className="flex-grow">
        <h3 className="text-xl">Description</h3>
        <p className="text-gray-500">{task_detail}</p>
        <h3 className="text-xl mt-4">What you will submit?</h3>
        <p className="text-gray-500 mb-4">{submission_info}</p>
        <hr />
        {/* form */}
        <div className="my-4">
          <h3 className="text-xl mb-4">
            Please provide the necessary proof of job completion
          </h3>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <div className="form-control w-full">
                <textarea
                  aria-label="submission_details"
                  placeholder="Enter details here"
                  className="w-full border rounded p-4 h-36"
                  {...register("submission_details", {
                    required: { value: true, message: "Provide documents" },
                  })}
                />
                <div className="label">
                  {errors.submission_details?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.submission_details.message}
                    </span>
                  )}
                </div>
              </div>

              <input
                disabled={loading}
                className="btn bg-gradient-to-r from-customOrange to-[#ffb347] uppercase text-white border-0 w-full mt-3"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl text-gray-500 mb-2">Task Information</h4>
        <hr />
        <div className="border mt-4">
          <div className="flex items-center pr-6 xs:p-6">
            <div>
              <img src={profile} alt="profile" className="w-12" />
            </div>
            <div className="divider divider-horizontal"></div>
            <div>
              <p className="text-orange-600 font-semibold uppercase">
                Job id: {_id}
              </p>
              <p className="text-gray-500">Job posted by {creator_name}</p>
            </div>
          </div>
          <hr />
          <TaskInfo
            icon={<FaRegMoneyBillAlt />}
            data={payable_amount}
            description="You will earn for this job"
          />
          <hr />
          <TaskInfo
            icon={<FaRegCalendarAlt />}
            data={published_date}
            description="Published date"
          />
          <hr />
          <TaskInfo
            icon={<FaRegClock />}
            data={completion_date}
            description="Deadline"
          />
          <hr />
          <TaskInfo
            icon={<FaRegListAlt />}
            data={task_count}
            description="Number of jobs"
          />
        </div>
      </div>
    </div>
  );
};

const TaskInfo = ({ icon, data, description }) => {
  return (
    <div className="flex items-center p-6">
      <div className="text-4xl text-orange-600">{icon}</div>
      <div className="divider divider-horizontal"></div>
      <div>
        <p className="text-orange-600 font-semibold uppercase tracking-wide">
          {data}
        </p>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default DetailsAndSubmissionForm;
