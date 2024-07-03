import { FaCheckCircle } from "react-icons/fa";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useSubmissions from "../../../hooks/useSubmissions";
import useUser from "../../../hooks/useUser";

const WorkerHome = () => {
  const { submissions, isLoading } = useSubmissions();
  const { user } = useUser();

  const approved = submissions?.filter(
    (submission) => submission.status === "approved"
  );

  if (isLoading) {
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
        <div>
          <h3 className="text-xl">Available Coins</h3>
          <p className="text-gray-500 mb-4">
            You have <span>{user?.coin}</span> coins.
          </p>
          <h3 className="text-xl">Total Submissions</h3>
          <p className="text-gray-500 mb-4">
            You have submitted total {submissions.length} tasks. Please wait for
            the client&apos;s review
          </p>
        </div>

        <div>
          <h3 className="text-xl">Approved Submissions</h3>
          {approved.length ? (
            <>
              <p className="text-gray-500 mb-4">
                Total {approved.length} submissions have been reviewed by the
                client
              </p>
              <div className="overflow-x-auto">
                <table className="table w-full border rounded">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task Title</th>
                      <th>Payable Amount</th>
                      <th>Creator Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((submission, index) => {
                      const modifiedTitle =
                        submission.task_title.length > 24
                          ? `${submission.task_title.substring(0, 24)}...`
                          : submission.task_title;
                      return (
                        <tr key={submission._id}>
                          <td>{index + 1}</td>
                          <td className="min-w-56">{modifiedTitle}</td>
                          <td>{submission.payable_amount}</td>
                          <td>{submission.creator_name}</td>
                          <td className="min-w-36">
                            <span className="text-green-600 bg-green-100 font-semibold px-2 py-1 rounded">
                              <FaCheckCircle className="inline" />{" "}
                              {submission.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-gray-500 mb-4">
              All your submissions are waiting for client&apos;s review. You
              will be notified as soon as your submissions are reviewed.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkerHome;
