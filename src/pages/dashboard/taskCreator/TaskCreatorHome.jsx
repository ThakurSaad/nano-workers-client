import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useMyTasks from "../../../hooks/useMyTasks";
import usePayments from "../../../hooks/usePayments";
import useUser from "../../../hooks/useUser";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ReviewTasksTable from "./ReviewTasksTable";
import Swal from "sweetalert2";
import { useState } from "react";

const TaskCreatorHome = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUser();
  const { payments, isLoading: paymentsLoading } = usePayments();
  const { myTasks, isLoading: myTasksLoading } = useMyTasks();
  const axiosPrivate = useAxiosPrivate();
  const {
    data: submissions = [],
    isLoading: submissionsLoading,
    refetch,
  } = useQuery({
    queryKey: ["review_submissions", user?.user_email],
    queryFn: async () => {
      const res = await axiosPrivate.get(
        `/submission/review/${user?.user_email}`
      );
      const pendingSubmissions = res.data.filter(
        (submission) => submission.status === "pending"
      );
      return pendingSubmissions;
    },
  });

  const postedTasks = sumFunction(myTasks, "task_count");
  const totalCoins = sumFunction(payments, "coin_purchase");
  const totalPayment = sumFunction(payments, "amount");

  const updateStatusToDB = async (
    id,
    status,
    payable_amount = 0,
    worker_email = ""
  ) => {
    try {
      const editedStatus = status === "rejected" ? "Reject" : "Approve";
      Swal.fire({
        title: `Confirm ${editedStatus}`,
        text: `Are you sure you want to ${editedStatus} the submission?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            id,
            status,
            coins: payable_amount,
            email: worker_email,
          };

          setLoading(true);
          const res = await axiosPrivate.patch("/submission", data);
          setLoading(false);
          refetch();

          if (res.data.modifiedCount) {
            Swal.fire(
              `${status}`,
              `${
                status === "rejected"
                  ? "The submission status has been updated to rejected. Worker will be notified shortly"
                  : `The submission status has been updated to approved. ${payable_amount} coins have been sent to worker`
              }`,
              "success"
            );
          } else {
            Swal.fire(
              "Something went wrong",
              "If the issue persists, please try again after hard reload (ctrl + shift + R)",
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

  const handleViewDetails = async (
    _id,
    task_id,
    task_title,
    task_detail,
    payable_amount,
    submission_details,
    worker_name,
    worker_email,
    current_date,
    status
  ) => {
    Swal.fire(
      `${task_title}`,
      `
      <div style="text-align: start;">
        <p>Task Detail : ${task_detail} </p>
        </br>
        <p>Submission Details : ${submission_details} </p>
        <p>Submission Id : ${_id} </p>
        <p>Task Id : ${task_id} </p>
        <p>Payable Amount : ${payable_amount} coins </p>
        <p>Worker Name : ${worker_name} </p>
        <p>Worker Email : ${worker_email} </p>
        <p>Submitted at : ${current_date} </p>
        <p>Status : ${status} </p>
      </div>
      `,
      "info"
    );
  };

  const handleApprove = async (id, payable_amount, worker_email) => {
    await updateStatusToDB(id, "approved", payable_amount, worker_email);
  };

  const handleReject = async (id) => {
    await updateStatusToDB(id, "rejected");
  };

  function sumFunction(arrayOfObject, propertyKeyStr) {
    return arrayOfObject.reduce((total, object) => {
      return total + object[propertyKeyStr];
    }, 0);
  }

  if (
    loading ||
    isLoading ||
    paymentsLoading ||
    myTasksLoading ||
    submissionsLoading
  ) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"My Home"}
          subHeading={"Welcome to your dashboard"}
        />
      </div>

      <div>
        <h3 className="text-xl">Available Coins</h3>
        <p className="text-gray-500 mb-4">
          You have{" "}
          <span className="text-customOrange font-semibold">{user?.coin}</span>{" "}
          coins.
        </p>
        <h3 className="text-xl">Posted Tasks</h3>
        <p className="text-gray-500 mb-4">
          Showing sum of task quantities of all the tasks posted by you. <br />
          <span className="text-customOrange font-semibold">{postedTasks}</span>
          &nbsp;tasks have been posted by you 🎉
        </p>
        <h3 className="text-xl">Payments</h3>
        <p className="text-gray-500 mb-4">
          You have paid{" "}
          <span className="text-customOrange font-semibold">
            {totalPayment}
          </span>
          &nbsp;dollars and bought{" "}
          <span className="text-customOrange font-semibold">{totalCoins}</span>
          &nbsp;coins 🎉
        </p>

        <h3 className="text-xl">In Review</h3>
        {submissions.length ? (
          <>
            <p className="text-gray-500 mb-4">
              You have{" "}
              <span className="text-customOrange font-semibold">
                {submissions.length}
              </span>
              &nbsp;pending submissions to review.
            </p>
          </>
        ) : (
          <p className="text-gray-500 mb-4">
            Currently you have no pending submissions to review.
          </p>
        )}
      </div>

      {submissions.length ? (
        <ReviewTasksTable
          submissions={submissions}
          handleViewDetails={handleViewDetails}
          handleReject={handleReject}
          handleApprove={handleApprove}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default TaskCreatorHome;
