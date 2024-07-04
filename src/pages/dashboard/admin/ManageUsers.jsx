import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useAllUsers from "../../../hooks/useAllUsers";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFilterUsers from "../../../hooks/useFilterUsers";
import UsersTable from "./UsersTable";

const ManageUsers = () => {
  const { register, handleSubmit } = useForm();
  const { users, isLoading, refetch } = useAllUsers();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const workerUsers = useFilterUsers(users, "worker");
  const taskCreatorUsers = useFilterUsers(users, "task-creator");
  const adminUsers = useFilterUsers(users, "admin");

  const updateRoleToDB = async (roleAndId) => {
    try {
      Swal.fire({
        title: "Confirm Update",
        text: `Updating role of userId: ${roleAndId.id}, updatedRole: ${roleAndId.role}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        icon: "question",
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

  const deleteUserFromDB = async (id) => {
    try {
      Swal.fire({
        title: "Confirm Delete",
        text: `Once deleted it can't be undone. Deleting user ${id}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await axiosPrivate.delete(`/user/${id}`);
          setLoading(false);
          refetch();

          if (res.data.deletedCount) {
            Swal.fire(
              "Successful",
              `You have deleted the user.<br/> He/she will not be able to use this site anymore.`,
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

  const handleDelete = async (userId) => {
    await deleteUserFromDB(userId);
  };

  if (isLoading || loading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Manage Users"}
          subHeading={"Viewing all the nano worker users"}
        />
      </div>
      <div>
        <h3 className="text-xl">Update</h3>
        <p className="text-gray-500 mb-4">
          You can update a specific user&apos;s role.
        </p>
        <h3 className="text-xl">Remove</h3>
        <p className="text-gray-500 mb-4">
          You can remove a specific user. <br /> Make sure to confirm before
          deletion. Once deleted the user will not be able to use this platform.
        </p>
      </div>

      <div>
        <h3 className="text-xl my-4">
          Number of workers : {workerUsers.length}
        </h3>
        <UsersTable
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          users={workerUsers}
        />
      </div>

      <div>
        <h3 className="text-xl my-4">
          Number of task creators : {taskCreatorUsers.length}
        </h3>
        <UsersTable
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          users={taskCreatorUsers}
        />
      </div>

      <div>
        <h3 className="text-xl mt-4">Number of admins : {adminUsers.length}</h3>
        <p className="text-gray-500 mb-4">
          Admins have special privileges. Actions are restricted.
        </p>
        <UsersTable
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          users={adminUsers}
        />
      </div>
    </section>
  );
};

export default ManageUsers;
