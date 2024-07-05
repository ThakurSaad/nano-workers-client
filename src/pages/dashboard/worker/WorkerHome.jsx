import { FaCheckCircle, FaCoins } from "react-icons/fa";
import Loader from "../../../components/Loader";
import SectionTitle from "../../../components/SectionTitle";
import useSubmissions from "../../../hooks/useSubmissions";
import useUser from "../../../hooks/useUser";
import useSumFunction from "../../../hooks/useSumFunction";

const WorkerHome = () => {
  const { submissions, isLoading } = useSubmissions();
  const { user } = useUser();
  const sumFunction = useSumFunction();
  const approved = submissions?.filter(
    (submission) => submission.status === "approved"
  );
  const totalCoins = sumFunction(approved, "payable_amount");
  const totalAmount = Math.round(totalCoins / 20);

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
          <h3 className="text-xl">Total Earnings</h3>
          <p className="text-gray-500 mb-4">
            You have earned total&nbsp;
            <span className="text-customOrange font-semibold">
              {totalCoins}
            </span>
            &nbsp;coins amounting around{" "}
            <span className="text-customOrange font-semibold">
              {totalAmount}
            </span>{" "}
            dollars 🎉
          </p>
          <h3 className="text-xl">Available Coins</h3>
          <p className="text-gray-500 mb-4">
            You have{" "}
            <span className="text-customOrange font-semibold">
              {user?.coin}
            </span>{" "}
            coins.
          </p>
          <h3 className="text-xl">Total Submissions</h3>
          <p className="text-gray-500 mb-4">
            You have submitted total{" "}
            <span className="text-customOrange font-semibold">
              {submissions.length}
            </span>{" "}
            tasks. Please wait for the client&apos;s review
          </p>
        </div>

        <div>
          <h3 className="text-xl">Approved Submissions</h3>
          {approved.length ? (
            <>
              <p className="text-gray-500 mb-4">
                Total&nbsp;
                <span className="text-customOrange font-semibold">
                  {approved.length}
                </span>
                &nbsp;submissions have been reviewed by the client
              </p>
              <div className="overflow-x-auto">
                <table className="table w-full border rounded">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task Title</th>
                      <th className="text-center">Payable Amount</th>
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
                          <td className="text-center">
                            {submission.payable_amount}{" "}
                            <FaCoins className="text-lg ml-1 inline text-customOrange" />
                          </td>
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
