import SectionTitle from "../../../components/SectionTitle";
import useAllTasks from "../../../hooks/useAllTasks";
import useDateTime from "../../../hooks/useDateTime";
import Loader from "../../../components/Loader";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import TasksTable from "./TasksTable";
import { FaRegClock } from "react-icons/fa";

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

  const handleViewDetails = async (
    _id,
    task_title,
    task_detail,
    submission_info,
    task_count,
    payable_amount,
    completion_date,
    published_date,
    creator_name,
    creator_email
  ) => {
    Swal.fire(
      "Viewing Details",
      `
      <div style="text-align: start;">
        <p>Task Id : ${_id} </p>
        <p>Task Title : ${task_title} </p>
        <p>Task Detail : ${task_detail} </p>
        <p>Submission Info : ${submission_info} </p>
        <p>Task Count : ${task_count} </p>
        <p>Payable Amount : ${payable_amount} coins per task </p>
        <p>Total Amount : ${payable_amount * task_count} coins </p>
        <p>Published : ${published_date} </p>
        <p>Deadline : ${completion_date} </p>
        <p>Task Creator : ${creator_name} </p>
        <p>Task Creator Email : ${creator_email} </p>
      </div>
      `,
      "info"
    );
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
            Task&apos;s past the deadline are tagged as &nbsp;
            <FaRegClock className="inline" /> expired.
          </span>
          &nbsp;You may delete them.
        </p>
      </div>

      <div>
        <TasksTable
          currentDateTime={currentDateTime}
          taskList={taskList}
          handleDelete={handleDelete}
          handleViewDetails={handleViewDetails}
        />
      </div>
    </section>
  );
};

export default ManageTasks;
