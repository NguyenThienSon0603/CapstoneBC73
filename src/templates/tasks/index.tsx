import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Select, Button, message, Spin } from "antd";
import { useState } from "react";
import { taskServices } from "../../services/taskManagement.services";

const { Option } = Select;

const TasksTemplate = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch danh sách Project, Status, Priority, Task Type, Users
  const { data: projectsData, isLoading: loadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: taskServices.getAllProjects,
  });
  // Đảm bảo projects luôn là mảng
  const projects = projectsData?.data || [];

  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: taskServices.getAllStatuses,
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: taskServices.getAllPriorities,
  });

  const { data: taskTypes } = useQuery({
    queryKey: ["taskTypes"],
    queryFn: taskServices.getAllTaskTypes,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: taskServices.getAllUsers,
  });


  // Mutation để tạo task mới
  const createTaskMutation = useMutation({
    mutationFn: (taskData) => taskServices.createTask(taskData),
    onMutate: () => setLoading(true),
    onSuccess: () => {
      message.success("Task created successfully!");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (er) => {
      message.error(er.response.data.content);
    },
    onSettled: () => setLoading(false),
  });

  // Xử lý submit form
  const onFinish = (values) => {
    const taskData = {
      projectId: Number(values.projectId),
      taskName: values.taskName,
      description: values.description || "",
      statusId: String(values.statusId),
      priorityId: Number(values.priorityId),
      typeId: Number(values.typeId),
      listUserAsign: values.listUserAsign?.length ? values.listUserAsign.map(Number) : [0], // Đảm bảo luôn có mảng số
      originalEstimate: Number(values.originalEstimate) || 0,
      timeTrackingSpent: Number(values.timeTrackingSpent) || 0,
      timeTrackingRemaining: Number(values.timeTrackingRemaining) || 0,
    };
    createTaskMutation.mutate(taskData);
  };

  return (
    <div className="max-w-5xl">
      <h2 className="mb-10 border-b-2 font-medium text-2xl">Create Task</h2>
      <Spin spinning={loading || loadingProjects}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="projectId" label="Project" rules={[{ required: true }]} className="font-medium">
            <Select showSearch placeholder="Select a project" optionFilterProp="label" loading={loadingProjects}>
              {loadingProjects ? (
                <Option disabled>Loading projects...</Option>
              ) : projects.length > 0 ? (
                projects
                  .filter((project) => project.id !== null && project.projectName !== null) // Loại bỏ null
                  .map((project) => (
                    <Option key={project.id} value={project.id ?? ""} label={project.projectName ?? "Unknown"}>
                      {project.projectName ?? "Unknown"}
                    </Option>
                  ))
              ) : (
                <Option disabled>No projects found</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item name="taskName" label="Task Name" rules={[{ required: true }]} className="font-medium">
            <Input placeholder="Enter task name" />
          </Form.Item>

          <Form.Item name="statusId" label="Status" rules={[{ required: true }]} className="font-medium">
            <Select placeholder="Select status">
              {statuses?.map((status) => (
                <Option key={status.statusId} value={status.statusId}>
                  {status.statusName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex gap-5 justify-between">
            <Form.Item className="w-full font-medium" name="priorityId" label="Priority" rules={[{ required: true }]}>
              <Select placeholder="Select priority">
                {priorities?.map((priority) => (
                  <Option key={priority.priorityId} value={priority.priorityId}>
                    {priority.priority}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="w-full font-medium" name="typeId" label="Task Type" rules={[{ required: true }]}>
              <Select placeholder="Select task type">
                {taskTypes?.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.taskType}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex gap-5 justify-between">
            <Form.Item className="w-full font-medium" name="listUserAsign" label="Assign Users">
              <Select mode="multiple" placeholder="Select users">
                {users?.map((user) => (
                  <Option key={user.userId} value={user.userId}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="w-full font-medium" name="originalEstimate" label="Original Estimate">
              <Input type="number" placeholder="Enter estimated hours" />
            </Form.Item>
          </div>

          <div className="flex gap-5 justify-between">
            <Form.Item className="w-full font-medium" name="timeTrackingSpent" label="Time Spent">
              <Input type="number" placeholder="Enter hours spent" />
            </Form.Item>

            <Form.Item className="w-full font-medium" name="timeTrackingRemaining" label="Time Remaining">
              <Input type="number" placeholder="Enter remaining hours" />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Description" className="font-medium">
            <Input.TextArea placeholder="Enter task description" style={{height:"200px"}} />
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit" loading={createTaskMutation.isLoading}>
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default TasksTemplate;
