import { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import TaskColumn from "../templates/tasks/components/StatusNameColumns";
import { useParams } from "react-router-dom";
import { projectManagementServices } from "../services/projectManagement.services";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { ProjectDetailType } from "../services/projectTypes";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const projectIdNumber = Number(projectId);

  // Fetch dữ liệu project
  const { data: project, isLoading, error } = useQuery<ProjectDetailType>({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => {
      const response = await projectManagementServices.getProjectDetail(projectIdNumber);
      return response.data;
    },
    enabled: !!projectId,
  });

  // State lưu danh sách task
  const [taskData, setTaskData] = useState<ProjectDetailType["content"]["lstTask"]>([]);

  // Cập nhật taskData khi project thay đổi
  useEffect(() => {
    if (project?.content?.lstTask) {
      setTaskData(project.content.lstTask);
    }
  }, [project]);

  // Xử lý kéo thả
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = taskData
      .flatMap((status) => status.lstTaskDeTail)
      .find((task) => task.taskId === active.id);

    if (!activeTask) return;

    setTaskData((prevTasks) => {
      return prevTasks.map((status) => {
        if (status.lstTaskDeTail.some((task) => task.taskId === active.id)) {
          return {
            ...status,
            lstTaskDeTail: status.lstTaskDeTail.filter((task) => task.taskId !== active.id),
          };
        }
        if (status.statusId === over.id) {
          return {
            ...status,
            lstTaskDeTail: [...status.lstTaskDeTail, activeTask],
          };
        }
        return status;
      });
    });
  };

  // Kiểm tra trạng thái trước khi render
  if (isLoading) return <Spin tip="Loading Project Details..." size="large" fullscreen />;
  if (error) return <p className="text-red-500">Error loading project details!</p>;
  if (!project || !taskData.length) return <p>No project details available.</p>;

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-5 w-full">
        {taskData.map((status) => (
          <TaskColumn key={status.statusId} status={status} tasks={status.lstTaskDeTail} />
        ))}
      </div>
    </DndContext>
  );
};

export default ProjectDetail;
