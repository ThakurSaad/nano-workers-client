import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import TaskCard from "./TaskCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../../components/Loader";

const TaskList = () => {
  const axiosPublic = useAxiosPublic();

  const { data: taskList = [], isLoading } = useQuery({
    queryKey: ["taskList"],
    queryFn: async () => {
      const res = await axiosPublic.get("/taskList");
      return res.data;
    },
  });

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
            published_date={task.published_date}
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
