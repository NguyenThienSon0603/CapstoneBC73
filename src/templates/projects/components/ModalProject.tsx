import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { fetchAllCategory } from "../../../store/projectCategory.slice";

const { Option } = Select;

interface CreateProjectModalProps {
  visible: boolean;
  onCreate: (project: { projectName: string; description: string; categoryId: number; alias: string }) => void;
  onCancel: () => void;
  project?: { id: number; projectName: string; description: string; categoryId: number; alias: string };
}

const ModalProject: React.FC<CreateProjectModalProps> = ({ visible, onCreate, onCancel, project }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { categoryList } = useSelector((state: RootState) => state.categoryReducer);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  // Cập nhật form khi mở modal
  useEffect(() => {
    if (visible) {
      if (project) {
        form.setFieldsValue(project);
      } else {
        form.resetFields();
      }
    }
  }, [project, visible, form]);

  // Hàm tạo alias từ projectName
  const generateAlias = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu "-"
      .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự đặc biệt
  };

  return (
    <Modal
      title={project ? "Edit Project" : "Create New Project"}
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onCreate({ ...values, id: project?.id });
          form.resetFields();
        });
      }}
      okText={project ? "Update" : "Create"}
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues) => {
          if (changedValues.projectName) {
            form.setFieldsValue({
              alias: generateAlias(changedValues.projectName),
            });
          }
        }}
      >
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[{ required: true, message: "Please enter project name!" }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select category">
            {categoryList?.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.projectCategoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Alias"
          name="alias"
          rules={[{ required: true, message: "Alias is required!" }]}
        >
          <Input placeholder="Auto-generated alias" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProject;
