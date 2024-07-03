import {
  FaCheckCircle,
  FaCoins,
  FaHourglassHalf,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

const SubmissionsTable = ({ submissions = [], handleViewDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Creator Name</th>
            <th>Creator Email</th>
            <th>Payable Amount</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map((submission, index) => {
            const modifiedTitle =
              submission.task_title.length > 25
                ? `${submission.task_title.substring(0, 25)}...`
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
                  {submission.status === "pending" && (
                    <span className="text-customOrange bg-orange-100 font-semibold px-2 py-1 rounded">
                      <FaHourglassHalf className="inline" /> {submission.status}
                    </span>
                  )}
                  {submission.status === "approved" && (
                    <span className="text-green-600 bg-green-100  font-semibold px-2 py-1 rounded">
                      <FaCheckCircle className="inline" /> {submission.status}
                    </span>
                  )}
                  {submission.status === "rejected" && (
                    <span className="text-red-600 bg-red-100  font-semibold px-2 py-1 rounded">
                      <FaTimesCircle className="inline" /> {submission.status}
                    </span>
                  )}
                </td>
                <td>
                  <button
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
                        submission.creator_name,
                        submission.creator_email,
                        submission.current_date
                      )
                    }
                    className="btn btn-sm bg-customOrange hover:text-neutral text-white uppercase"
                  >
                    <FaInfoCircle className="text-xl" />
                  </button>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
