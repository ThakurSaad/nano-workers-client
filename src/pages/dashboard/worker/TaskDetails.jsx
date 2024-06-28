import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import DetailsAndSubmissionForm from "./DetailsAndSubmissionForm";
import Loader from "../../../components/Loader";
import useTask from "../../../hooks/useTask";

// full page
const TaskDetails = () => {
  const { taskId } = useParams();
  const { task, isLoading } = useTask(taskId);

  const {
    _id,
    task_title,
    task_detail,
    task_count,
    submission_info,
    published_date,
    completion_date,
    payable_amount,
    creator_name,
    creator_email,
  } = task;

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Task Details"} subHeading={`${task_title}`} />
      </div>
      <div>
        <DetailsAndSubmissionForm
          _id={_id}
          task_title={task_title}
          task_detail={task_detail}
          task_count={task_count}
          submission_info={submission_info}
          published_date={published_date}
          completion_date={completion_date}
          payable_amount={payable_amount}
          creator_name={creator_name}
          creator_email={creator_email}
        />
      </div>
      <div></div>
    </section>
  );
};

export default TaskDetails;
