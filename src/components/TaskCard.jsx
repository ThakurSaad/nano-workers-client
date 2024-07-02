import { FaCoins, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  _id,
  task_title,
  task_count,
  creator_name,
  current_time,
  completion_date,
  payable_amount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border hover:shadow-md duration-75 py-6 mb-6 w-full">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold uppercase px-6 mb-4">
            {task_title}
          </h2>
        </div>
        <hr />
        <div className="px-6">
          <div className="flex justify-between items-center my-4">
            <span className="flex items-center bg-blue-50 text-orange-600 text-xs px-2 py-1 rounded tracking-wider">
              <FaTag /> &nbsp; AVAILABLE JOBS
            </span>
            <span className="text-sm font-bold text-orange-600 bg-blue-50 rounded-full px-2 py-1">
              {task_count}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Posted By</span>
            <span className="text-orange-600 uppercase">{creator_name}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Published</span>
            <span className="text-orange-600">{current_time}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">Deadline</span>
            <span className="text-orange-600">{completion_date}</span>
          </div>
          <hr />
          <div className="flex justify-between items-center mt-4">
            <span className="text-orange-600 text-lg font-semibold">
              {payable_amount}
              <FaCoins className="inline-block ml-[6px]"/>
            </span>
            <button
              onClick={() => navigate(`${_id}`)}
              className="bg-orange-600 text-white text-sm px-5 py-2 font-semibold rounded uppercase"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
