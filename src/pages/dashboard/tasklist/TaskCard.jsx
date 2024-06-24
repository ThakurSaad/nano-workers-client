import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  _id,
  task_title,
  task_count,
  creator_name,
  published_date,
  completion_date,
  payable_amount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border hover:shadow-md duration-75 py-6 mb-6 w-full">
      <h2 className="text-xl font-semibold uppercase tracking-wide px-6 mb-4">
        {task_title}
      </h2>
      <hr />
      <div className="px-6">
        <div className="flex justify-between items-center my-4">
          <span className="flex items-center bg-blue-50 text-orange-600 text-xs px-2 py-1 rounded tracking-wider">
            <FaTag /> &nbsp; AVAILABLE JOBS
          </span>
          <span className="text-sm text-orange-600 bg-blue-50 px-2 py-1 rounded">
            {task_count}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Posted By</span>
          <span className="text-orange-600 uppercase">{creator_name}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Published</span>
          <span className="text-orange-600">{published_date}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Deadline</span>
          <span className="text-orange-600">{completion_date}</span>
        </div>
        <hr />
        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-600 text-lg font-semibold">
            ${payable_amount}
          </span>
          <button
            onClick={() => navigate(`${_id}`)}
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
