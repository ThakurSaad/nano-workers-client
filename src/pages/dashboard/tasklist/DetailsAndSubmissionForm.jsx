import {
  FaRegCalendarAlt,
  FaRegClock,
  FaRegListAlt,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import profile from "../../../assets/profile.png";
import { useForm } from "react-hook-form";

const DetailsAndSubmissionForm = ({
  _id,
  task_detail,
  task_count,
  submission_info,
  published_date,
  completion_date,
  payable_amount,
  creator_name,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
