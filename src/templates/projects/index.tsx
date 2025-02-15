import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Table, Spin, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { projectManagementServices } from "../../services/projectManagement.services";
import Members from "./components/Members";
import ModalProject from "./components/ModalProject";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const ProjectTemplate = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Fetch all projects
    const { data, isLoading, error } = useQuery({
        queryKey: ["projects"],
        queryFn: projectManagementServices.fetchProjects,
    });
    const projectList = data?.data.content;

    // Mutations
    const createProjectMutation = useMutation({
        mutationFn: projectManagementServices.createProject,
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            message.success("Project created successfully!");
        },
        onError: () => {
            message.error("Failed to create project!");
        }
    });

    const updateProjectMutation = useMutation({
        mutationFn: ({ projectId, updatedData }) => projectManagementServices.updateProject(projectId, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            message.success("Project updated successfully!");
            setIsModalVisible(false);
        },
        onError: () => {
            message.error("Failed to update project!");
        }
    });

    const deleteProjectMutation = useMutation({
        mutationFn: projectManagementServices.deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            message.success("Project deleted successfully!");
        },
        onError: () => {
            message.error("Failed to delete project!");
        }
    });

    // State để lưu dữ liệu
    const [filterProjects, setFilterProjects] = useState(projectList);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); // Lưu project cần chỉnh sửa

    // Sử dụng useEffect để load dữ liệu khi lần đầu render
    useEffect(() => {
        setFilterProjects(projectList || []);
    }, [projectList]);

    // Hàm xử lý tạo/sửa project
    const handleSaveProject = async (project) => {
        if (selectedProject) {
            // Nếu có selectedProject -> cập nhật
            updateProjectMutation.mutate({ projectId: selectedProject.id, updatedData: project });
        } else {
            // Nếu không có -> tạo mới
            createProjectMutation.mutate(project);
        }
    };

    // Hàm mở modal với dữ liệu chỉnh sửa
    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsModalVisible(true);
    };

    // Hàm xóa project
    const handleDeleteProject = (projectId:number) => {        
        deleteProjectMutation.mutate(projectId);
    };

    // Hàm tìm kiếm project
    const handleSearch = (value) => {
        if (value) {
            const filteredData = projectList?.filter(project => project.projectName.toLowerCase().includes(value.toLowerCase()));
            setFilterProjects(filteredData);
        } else {
            setFilterProjects(projectList);
        }
    };

    if (isLoading) return (
        <Spin tip="Loading" size="large" fullscreen />
    );

    if (error) {
        message.error("Failed to load projects!");
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'ID' },
        { title: 'Project Name', dataIndex: 'projectName', key: 'projectName',
        render: (text, record) => (
            <span 
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate(`/projectdetail/${record.id}`)}
            >
                {text}
            </span>
        ), },
        { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
        { 
            title: 'Creator', 
            dataIndex: 'creator', 
            key: 'creator',
            render: (creator) => (
                <span className='bg-yellow-100 border-2 border-red-100 rounded p-1 text-center text-yellow-600'>
                    {creator.name}
                </span>
            ),
        },
        { 
            title: 'Members', 
            dataIndex: 'id', 
            key: 'ID',
            render: (id) => <Members projectID={id} />,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'ID',
            render: (_, record) => (
                <div className="flex gap-2">
                    <EditOutlined onClick={() => handleEditProject(record)} className="cursor-pointer text-white bg-blue-500 p-2 hover:bg-blue-400 transition" />
                    <DeleteOutlined onClick={() => handleDeleteProject(record.id)} className="cursor-pointer text-white bg-red-500 p-2 hover:bg-red-400 transition" />
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-medium">Project Management</h2>

            <div className="flex justify-between items-center mt-3">
                <Search allowClear placeholder="Enter Project Name" onSearch={handleSearch} style={{ width: 300 }} />
                <Button onClick={() => { setSelectedProject(null); setIsModalVisible(true); }} type="primary" className="font-medium">
                    Create Project
                </Button>
                <ModalProject 
                    visible={isModalVisible} 
                    onCreate={handleSaveProject} 
                    onCancel={() => setIsModalVisible(false)}
                    project={selectedProject} // Truyền project cần chỉnh sửa vào modal
                />
            </div>

            <div className='mt-3'>
                <Table className='tbl-ProjectList'
                    dataSource={filterProjects}
                    columns={columns}
                    rowKey='id'
                    pagination={{ pageSize: 20 }}
                />
            </div>
        </div>
    );
};

export default ProjectTemplate;
