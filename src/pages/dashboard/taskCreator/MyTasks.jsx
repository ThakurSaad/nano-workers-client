import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../components/Loader";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyTasks = () => {
  const { user, refetch: fetchUser } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const {
    data: myTasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTasks", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/myTasks/${user?.user_email}`);
      const myTasks = res.data.sort(
        (a, b) => new Date(b.current_time) - new Date(a.current_time)
      );
      return myTasks;
    },
  });

  const deleteFromToDB = async (idAndCoinAndEmail) => {
    try {
      Swal.fire({
        title: "Confirm deletion? You can't undo it",
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
            Swal.fire(`Deleted`, "Your coins have been refunded", "success");
          } else {
            Swal.fire(
              "Something went wrong",
              "Please try again after hard reload (ctrl + shift + R)",
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
        <h4 className="text-lg mb-2">Total Tasks: {myTasks.length}</h4>
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
                  task.task_title.length > 10
                    ? `${task.task_title.substring(0, 15)}...`
                    : task.task_title;
                return (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td className="min-w-40">{modifiedTitle}</td>
                    <td>{task.task_count}</td>
                    <td>
                      {task.payable_amount}
                      <FaCoins className="text-lg mx-2 inline text-customOrange" />
                      ({task.task_count * task.payable_amount})
                    </td>
                    <td className="min-w-40 px-1">{task.current_time}</td>
                    <td className="min-w-40 px-1">{task.completion_date}</td>
                    <td>
                      <button className="btn btn-sm bg-orange-100 text-customOrange uppercase">
                        <Link to={`${task._id}`}>Update</Link>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm bg-red-100 text-red-500 uppercase"
                        onClick={() =>
                          handleDelete(
                            task._id,
                            task.task_count * task.payable_amount
                          )
                        }
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyTasks;
