import SectionTitle from "../../../components/SectionTitle";
import Loader from "../../../components/Loader";
import {
  FaCheckCircle,
  FaCoins,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import useSubmissions from "../../../hooks/useSubmissions";

const MySubmissions = () => {
  const { submissions, isLoading } = useSubmissions();

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"Task Details"}
          subHeading={`Total Submitted Tasks: ${submissions.length}`}
        />
      </div>
      <div>
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {submissions.map((submission) => (
              <div
                key={submission._id}
                className="card rounded-lg border shadow-md hover:shadow-xl duration-75 mb-6 w-full"
              >
                <div className="card-body">
                  <h2 className="card-title">{submission.task_title}</h2>
                  <p className="text-gray-500">
                    <strong>Job Description:</strong> {submission.task_detail}
                  </p>
                  <p className="text-gray-500">
                    <strong>Your submission:</strong>{" "}
                    {submission.submission_details}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <p>
                      <strong>You will earn:</strong> &nbsp;
                      {submission.payable_amount} <FaCoins className="inline" />
                    </p>
                  </div>
                  <p className="text-gray-500">
                    <strong>Job Posted by:</strong> {submission.creator_name}
                  </p>
                  <p className="text-gray-500">
                    <strong>Submission Date:</strong> {submission.current_date}
                  </p>
                  <p className="text-gray-500">
                    <strong>Status:</strong> &nbsp;
                    {submission.status === "pending" && (
                      <span className="text-customOrange bg-orange-100 uppercase font-semibold px-3 py-1 rounded">
                        <FaHourglassHalf className="inline text-sm mb-1" />{" "}
                        {submission.status}
                      </span>
                    )}
                    {submission.status === "approved" && (
                      <span className="text-green-600 bg-green-100 uppercase font-semibold px-3 py-1 rounded">
                        <FaCheckCircle className="inline mb-1" />{" "}
                        {submission.status}
                      </span>
                    )}
                    {submission.status === "rejected" && (
                      <span className="text-red-600 bg-red-100 uppercase font-semibold px-3 py-1 rounded">
                        <FaTimesCircle className="inline mb-1" />{" "}
                        {submission.status}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySubmissions;
