import {
  FaCoins,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegListAlt,
} from "react-icons/fa";
import profile from "../../../assets/profile.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";
import Swal from "sweetalert2";
import useDateTime from "../../../hooks/useDateTime";

const DetailsAndSubmissionForm = ({
  _id,
  task_title,
  task_detail,
  task_count,
  submission_info,
  current_time,
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
  const currentDateTime = useDateTime();

  if (loading) {
    return <Loader height="min-h-full" />;
  }

  const saveSubmissionToDB = async (submission) => {
    try {
      Swal.fire({
        title: "Confirm Submission",
        text: "Are You sure you want to submit your work?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosPrivate.post("/submission", submission);
          if (res.data.insertedId) {
            Swal.fire(
              `Successful`,
              `Your submission has been sent to the client. <br/> Please wait for confirmation.`,
              "success"
            );
          } else {
            Swal.fire(
              `Something went wrong`,
              `Please try again after hard reload (ctrl + shift + R)`,
              "error"
            );
          }
        }
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const submission = {
        task_id: _id,
        task_title,
        task_detail,
        payable_amount: parseInt(payable_amount),
        worker_email: user.email,
        submission_details: data.submission_details,
        worker_name: user.displayName,
        creator_name,
        creator_email,
        current_date: currentDateTime,
        status: "pending",
      };

      await saveSubmissionToDB(submission);
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
        <div className="my-4 bg-gray-100 rounded px-4 py-4 md:py-12">
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
          <div className="flex items-center p-6">
            <div className="absolute xs:relative text-center w-12">
              <img src={profile} alt="profile" className="w-12 rounded-full" />
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
            icon={<FaCoins />}
            data={payable_amount}
            description="You will earn for this job"
          />
          <hr />
          <TaskInfo
            icon={<FaRegCalendarAlt />}
            data={current_time}
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
