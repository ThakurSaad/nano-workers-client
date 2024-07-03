import {
  FaCheckCircle,
  FaCoins,
  FaHourglassHalf,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";

const ReviewTasksTable = ({
  submissions = [],
  handleViewDetails,
  handleReject,
  handleApprove,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Worker Name</th>
            <th>Worker Email</th>
            <th>Payable Amount</th>
            <th>Status</th>
            <th>View</th>
            <th>Reject</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map((submission, index) => {
            const modifiedTitle =
              submission.task_title.length > 24
                ? `${submission.task_title.substring(0, 24)}...`
                : submission.task_title;
            return (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td className="min-w-56">{modifiedTitle}</td>
                <td>{submission.creator_name}</td>
                <td>{submission.creator_email}</td>
                <td className="text-center">
                  {submission.payable_amount}
                  <FaCoins className="text-lg mx-2 inline text-customOrange" />
                </td>
                <td className="min-w-36">
                  <span className="text-customOrange bg-orange-100 font-semibold px-2 py-1 rounded">
                    <FaHourglassHalf className="inline" /> {submission.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm bg-customOrange hover:text-neutral text-white uppercase"
                    onClick={() =>
                      handleViewDetails(
                        submission._id,
                        submission.task_id,
                        submission.task_title,
                        submission.task_detail,
                        submission.payable_amount,
                        submission.submission_details,
                        submission.worker_name,
                        submission.worker_email,
                        submission.current_date,
                        submission.status
                      )
                    }
                  >
                    <FaInfoCircle className="text-xl" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleReject(submission._id)}
                    className="btn btn-sm bg-red-700 hover:text-neutral text-white uppercase"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleApprove(
                        submission._id,
                        submission.payable_amount,
                        submission.worker_email
                      )
                    }
                    className="btn btn-sm bg-green-700 hover:text-neutral text-white uppercase"
                  >
                    <FaCheckCircle className="text-lg" />
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

export default ReviewTasksTable;
