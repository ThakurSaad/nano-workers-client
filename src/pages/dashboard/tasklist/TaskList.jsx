import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  }, []);
  return (
    <section>
      <div>
        <SectionTitle heading={"Task List"} />
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-4">
        {taskList.map((task) => (
          <TaskCard
            key={task._id}
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
