import SectionTitle from "../../../components/SectionTitle";
import Loader from "../../../components/Loader";
import useSubmissions from "../../../hooks/useSubmissions";
import SubmissionsTable from "./SubmissionsTable";
import Swal from "sweetalert2";

const MySubmissions = () => {
  const { submissions, isLoading } = useSubmissions();

  const handleViewDetails = async (
    _id,
    task_id,
    task_title,
    task_detail,
    payable_amount,
    submission_details,
    worker_name,
    worker_email,
    creator_name,
    creator_email,
    current_date
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
        <p>Creator Name : ${creator_name} </p>
        <p>Creator Email : ${creator_email} </p>
        <p>Your Name : ${worker_name} </p>
        <p>Your Email : ${worker_email} </p>
        <p>Submitted at : ${current_date} </p>
      </div>
      `,
      "info"
    );
  };

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle
          heading={"My submissions"}
          subHeading={`Detailed view of each task submission including status, date, and other relevant information`}
        />
      </div>
      <div>
        <h3 className="text-xl mb-4">
          Total Submissions : {submissions.length}
        </h3>
      </div>
      <div>
        {submissions.length ? (
          <SubmissionsTable
            submissions={submissions}
            handleViewDetails={handleViewDetails}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MySubmissions;
