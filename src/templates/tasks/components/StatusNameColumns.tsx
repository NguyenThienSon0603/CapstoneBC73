import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { TaskStatusType } from "../../../services/projectTypes";


type Props = {
  status: TaskStatusType;
  tasks: TaskStatusType["lstTaskDeTail"];
};

const StatusNameColumns = ({ status, tasks }: Props) => {
  const { setNodeRef } = useDroppable({ id: status.statusId });

  return (
    <div ref={setNodeRef} className="bg-gray-100 w-[25%] min-h-[200px] p-3 align-middle rounded-md overflow-hidden">
      <h3 className="text-gray-500 font-bold text-center border-b-2 pb-1">{status.statusName}</h3>
      <SortableContext items={tasks.map((t) => t.taskId)}>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.taskId} task={task} />)
        ) : (
          <p></p>
        )}
      </SortableContext>
    </div>
  );
};

export default StatusNameColumns;
