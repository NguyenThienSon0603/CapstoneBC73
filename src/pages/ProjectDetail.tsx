import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { projectManagementServices } from "../services/projectManagement.services";
import { Spin } from "antd";

const ProjectDetail = () => {
  const { projectId } = useParams(); // Lấy projectId từ URL

  const { data, isLoading, error } = useQuery({
    queryKey: ["projectDetail", projectId],
    queryFn: () => projectManagementServices.getProjectDetail(projectId),
    enabled: !!projectId, // Chỉ gọi API nếu có projectId
  });
  const project = data?.data.content;
  console.log('✌️project --->', project);


  if (isLoading) return <Spin tip="Loading Project Details..." size="large" fullscreen />;
  if (error) return <p className="text-red-500">Error loading project details!</p>;
  return (
    <div>
      <h2 className="text-2xl font-medium mb-5">{project.projectName}</h2>
      <div>
        <span>Creator: {project.creator.name}</span>
        <div>
          <span>Members: </span>
          {project.members.map((m) => (
            <span key={m.userId} className="inline">
              <img className="w-8 h-8 rounded-full" src={m.avatar} alt={m.name} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
