import { FaCoins, FaEye, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAllTasks from "../../../hooks/useAllTasks";
import useDateTime from "../../../hooks/useDateTime";
import Loader from "../../../components/Loader";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const { tasks: taskList, isLoading, refetch } = useAllTasks();
  const [loading, setLoading] = useState(false);
  const currentDateTime = useDateTime();
  const axiosPrivate = useAxiosPrivate();

  const deleteTaskFromDB = async (id) => {
    try {
      Swal.fire({
        title: "Confirm Delete",
        text: `Once deleted it can't be undone. Deleting Task ${id}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.delete(`/task/${id}`);
          setLoading(false);
          refetch();

          if (res.data.deletedCount) {
            Swal.fire(
              "Successful",
              `You have deleted the task.<br/> The task creator will be notified shortly.`,
              "success"
            );
          } else {
            Swal.fire(
              "Something went wrong",
              "If this issue persist please try again after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTaskFromDB(id);
  };

  const handleViewDetails = async (id) => {
    try {
      console.log(id);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if (isLoading || loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Manage Tasks"}
          subHeading={"Viewing all the tasks posted by task creators"}
        />
      </div>

      <div>
        <h3 className="text-xl">Availability</h3>
        <p className="text-gray-600 mt-2 mb-4">
          <span className="inline-block bg-gray-200 text-customOrange rounded-lg px-2 py-1">
            Task&apos;s past the deadline are tagged expired.
          </span>{" "}
          You may delete them.
        </p>
      </div>

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
                    <FaCoins className="text-lg mx-2 inline text-customOrange" />
                    ({task.task_count * task.payable_amount})
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
                      onClick={() => handleViewDetails(task._id)}
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
    </section>
  );
};

export default ManageTasks;
