import { FaCoins } from "react-icons/fa";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useAllUsers from "../../../hooks/useAllUsers";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ManageUsers = () => {
  const { register, handleSubmit } = useForm();
  const { users, isLoading, refetch } = useAllUsers();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const updateRoleToDB = async (roleAndId) => {
    try {
      Swal.fire({
        title: "Confirm Update",
        text: `Updating role of userId: ${roleAndId.id}, updatedRole: ${roleAndId.role}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.patch("/user", roleAndId);
          setLoading(false);
          refetch();

          if (res.data.modifiedCount) {
            Swal.fire(
              "Successful",
              `You have updated the user role. <br/> User will be notified of the change`,
              "success"
            );
          } else {
            Swal.fire(
              "Something went wrong",
              "You may have not updated any data.<br/> Even after updating if this issue persist please try again after hard reload (ctrl + shift + R)",
              "error"
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data, userId) => {
    const updatedRole = data[`role_${userId}`];
    const roleAndId = {
      role: updatedRole,
      id: userId,
    };

    await updateRoleToDB(roleAndId);
  };

  if (isLoading || loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Manage Users"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Coins</th>
              <th>Role</th>
              <th>Update Role</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.display_name}</td>
                  <td>{user.user_email}</td>
                  <td>
                    {user.coin}
                    <FaCoins className="text-lg mx-2 inline text-customOrange" />
                  </td>
                  <td>
                    <span className="bg-gray-200 rounded-lg px-2 py-1">{user.role}</span>
                  </td>
                  <td className="text-center">
                    <form
                      onSubmit={handleSubmit((data) =>
                        onSubmit(data, user._id)
                      )}
                    >
                      <select
                        className="select select-bordered select-sm w-full max-w-xs"
                        defaultValue={user.role}
                        {...register(`role_${user._id}`, { required: true })}
                      >
                        <option value="worker">Worker</option>
                        <option value="task-creator">Task Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                      <br />
                      <button
                        type="submit"
                        className="btn btn-sm bg-orange-100 text-customOrange uppercase mt-2"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                  <td>
                    <button className="btn btn-sm bg-red-100 text-red-500 uppercase">
                      Remove
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

export default ManageUsers;
