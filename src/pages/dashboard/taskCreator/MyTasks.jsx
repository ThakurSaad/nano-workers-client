import SectionTitle from "../../../components/SectionTitle";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";
import { FaCoins, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useMyTasks from "../../../hooks/useMyTasks";

const MyTasks = () => {
  const { user, refetch: fetchUser } = useUser();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { myTasks, isLoading, refetch } = useMyTasks();

  const deleteFromToDB = async (idAndCoinAndEmail) => {
    try {
      Swal.fire({
        title: "Confirm Delete",
        text: `Once deleted it can't be undone. Deleting Task ${idAndCoinAndEmail.id}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosPrivate.delete("/task", {
            data: idAndCoinAndEmail,
          });

          refetch();
          fetchUser();

          if (res.data.deletedCount) {
            Swal.fire("Successful", `You have deleted the task`, "success");
          } else {
            Swal.fire(
              "Something went wrong",
              "If this issue persist please try again after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id, totalCoin) => {
    const idAndCoinAndEmail = {
      id,
      coin: totalCoin,
      email: user?.user_email,
    };

    await deleteFromToDB(idAndCoinAndEmail);
  };

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"My Tasks"}
          subHeading={
            "Manage all your tasks. Showing in order based on when you posted"
          }
        />
      </div>
      <div>
        <h3 className="text-xl">Update</h3>
        <p className="text-gray-500 mb-4">
          You can update task title, task detail and submission info
        </p>
        <h3 className="text-xl">Delete</h3>
        <p className="text-gray-500 mb-4">You can delete a specific task</p>
      </div>
      <div>
        <h4 className={`text-lg`}>Total Tasks: {myTasks.length}</h4>
        {myTasks.length ? (
          <>
            <p className="text-gray-500 mb-4">
              Viewing in descending order based on posting time
            </p>
            <div className="overflow-x-auto">
              <table className="table w-full border rounded">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task Title</th>
                    <th>Task Quantity</th>
                    <th>Payable Amount (total)</th>
                    <th>Posted</th>
                    <th>Deadline</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myTasks.map((task, index) => {
                    const modifiedTitle =
                      task.task_title.length > 15
                        ? `${task.task_title.substring(0, 15)}...`
                        : task.task_title;
                    return (
                      <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td className="min-w-40">{modifiedTitle}</td>
                        <td className="text-center">{task.task_count}</td>
                        <td className="text-center">
                          {task.payable_amount}
                          <FaCoins className="text-lg mx-2 inline text-customOrange" />
                          ({task.task_count * task.payable_amount})
                        </td>
                        <td className="min-w-40 px-1">{task.current_time}</td>
                        <td className="min-w-40 px-1">
                          {task.completion_date}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm bg-customOrange hover:text-neutral text-white uppercase"
                            onClick={() => navigate(task._id)}
                          >
                            <FaEdit className="text-xl" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm bg-red-700 hover:text-neutral text-white uppercase"
                            onClick={() =>
                              handleDelete(
                                task._id,
                                task.task_count * task.payable_amount
                              )
                            }
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
          </>
        ) : (
          <p className="text-gray-500 mb-4">You have not posted any tasks.</p>
        )}
      </div>
    </section>
  );
};

export default MyTasks;
