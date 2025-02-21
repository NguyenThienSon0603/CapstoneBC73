import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskType } from "../../../services/projectTypes";

type Props = {
  task: TaskType;
};

const TaskCard = ({ task }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.taskId });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-3 bg-blue-300 rounded-lg shadow-md cursor-grab select-none text-center transition-all duration-200 hover:bg-blue-400 active:scale-95"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <h3 className="font-semibold text-red-600">{task.taskName}</h3>
      <p className="text-red-800 text-sm">{task.taskTypeDetail.taskType}</p>
    </div>
  );
};

export default TaskCard;
