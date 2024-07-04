import { FaCoins, FaEdit, FaTrash } from "react-icons/fa";

const UsersTable = ({
  users,
  handleSubmit,
  onSubmit,
  register,
  handleDelete,
}) => {
  return (
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
          {users?.map((user, index) => {
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
                  <span className="inline-block bg-gray-200 rounded-lg px-2 py-1">
                    {user.role}
                  </span>
                </td>
                <td className="text-center">
                  <form
                    className="flex items-center"
                    onSubmit={handleSubmit((data) => onSubmit(data, user._id))}
                  >
                    <select
                      className="select select-bordered rounded-r-none select-sm w-full min-w-24 max-w-xs"
                      defaultValue={user.role}
                      {...register(`role_${user._id}`, { required: true })}
                    >
                      <option value="worker">Worker</option>
                      <option value="task-creator">Task Creator</option>
                      <option value="admin">Admin</option>
                    </select>
                    {/* <br /> */}
                    <button
                      type="submit"
                      className="btn btn-sm border-2 border-customOrange rounded-l-none bg-customOrange hover:text-neutral text-white uppercase -ml-3"
                      disabled={user.role === "admin"}
                    >
                      <FaEdit className="text-xl" />
                    </button>
                  </form>
                </td>
                <td>
                  <button
                    className="btn btn-sm bg-red-700 hover:text-neutral text-white uppercase"
                    disabled={user.role === "admin"}
                    onClick={() => handleDelete(user._id)}
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

export default UsersTable;
