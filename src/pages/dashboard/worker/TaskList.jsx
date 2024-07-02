import SectionTitle from "../../../components/SectionTitle";
import Loader from "../../../components/Loader";
import TaskCard from "../../../components/TaskCard";
import useAllTasks from "../../../hooks/useAllTasks";

const TaskList = () => {
  const { tasks: taskList, isLoading } = useAllTasks();

  if (isLoading) {
    return <Loader height="min-h-full" />;
  }

  return (
    <section>
      <div>
        <SectionTitle heading={"Task List"} />
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        {taskList.map((task) => (
          <TaskCard
            key={task._id}
            _id={task._id}
            task_title={task.task_title}
            task_count={task.task_count}
            current_time={task.current_time}
            payable_amount={task.payable_amount}
            completion_date={task.completion_date}
            creator_name={task.creator_name}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
