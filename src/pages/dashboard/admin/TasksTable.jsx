import { FaCoins, FaEye, FaTrash } from "react-icons/fa";

const TasksTable = ({
  taskList = [],
  currentDateTime,
  handleViewDetails,
  handleDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Task Creator Name</th>
            <th>Task Quantity</th>
            <th>Payable Amount (total)</th>
            <th>Availability</th>
            <th>View Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => {
            const modifiedTitle =
              task.task_title.length > 15
                ? `${task.task_title.substring(0, 15)}...`
                : task.task_title;
            const available =
              new Date(task.completion_date) < new Date(currentDateTime)
                ? false
                : true;
            return (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td className="min-w-40">{modifiedTitle}</td>
                <td>{task.creator_name}</td>
                <td>{task.task_count}</td>
                <td>
                  {task.payable_amount}
                  <FaCoins className="text-lg mx-2 inline text-customOrange" />(
                  {task.task_count * task.payable_amount})
                </td>
                <td className="min-w-40 px-1">
                  {available ? (
                    task.completion_date
                  ) : (
                    <span className="inline-block bg-gray-200 rounded-lg px-2 py-1">
                      Expired
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleViewDetails(
                        task._id,
                        task.task_title,
                        task.task_detail,
                        task.submission_info,
                        task.task_count,
                        task.payable_amount,
                        task.completion_date,
                        task.published_date,
                        task.creator_name,
                        task.creator_email
                      )
                    }
                    className="btn btn-sm bg-customOrange hover:text-neutral text-white uppercase"
                  >
                    <FaEye className="text-xl" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm bg-red-700 hover:text-neutral text-white uppercase"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
