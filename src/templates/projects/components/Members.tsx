import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, Popover, Spin, message } from "antd";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectMemberServices } from "../../../services/projectMembers.services";

const { Search } = Input;

type Member = {
  userId: number;
  avatar: string;
  name: string;
};

type MembersProps = {
  projectID: number;
};

const Members: React.FC<MembersProps> = ({ projectID }) => {
  const queryClient = useQueryClient();

  // Fetch danh sách thành viên của project
  const { data: projectMembers } = useQuery({
    queryKey: ["projectMembers", projectID],
    queryFn: () => projectMemberServices.getAllMemberByProject(projectID),
  });

  const members: Member[] = Array.isArray(projectMembers?.data?.content)
    ? projectMembers.data.content
    : [];

  // State quản lý popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Fetch danh sách user theo searchValue
  const { data: userList, isLoading } = useQuery({
    queryKey: ["listMembers", searchValue],
    queryFn: () => projectMemberServices.getUserByName(searchValue),
    enabled: !!searchValue,
  });

  // Mutation thêm user vào project
  const addUserMutation = useMutation({
    mutationFn: ({ projectID, userId }: { projectID: number; userId: number }) =>
      projectMemberServices.addMemberToProject(projectID, userId),
    onSuccess: (_, { userId }) => {
      message.success("User added successfully!");
      queryClient.invalidateQueries(["projectMembers", projectID]);

      // Xóa user đã thêm khỏi danh sách để tránh bị thêm trùng
      queryClient.setQueryData(["listMembers", searchValue], (prevData: any) => {
        if (!prevData?.data?.content) return prevData;
        return {
          ...prevData,
          data: {
            ...prevData.data,
            content: prevData.data.content.filter((user: Member) => user.userId !== userId),
          },
        };
      });

      setIsPopoverOpen(true);
    },
    onError: () => {
      message.error("Failed to add user!");
    },
  });

  // Mutation xóa user khỏi project
  const removeUserMutation = useMutation({
    mutationFn: ({ projectID, userId }: { projectID: number; userId: number }) => 
      projectMemberServices.removeUserFromProject(projectID, userId),
    onSuccess: () => {
      message.success("User removed successfully!");
      queryClient.invalidateQueries(["projectMembers", projectID]);
    },
    onError: () => {
      message.error("Failed to remove user!");
    },
  });

  const handleSearch = (value: string) => setSearchValue(value);
  const handleSelectUser = (userId: number) => addUserMutation.mutate({ projectID, userId });
  const handleRemoveUser = (userId: number) => {
    removeUserMutation.mutate({ projectID, userId });
  };

  return (
    <div className="flex gap-2">
      {members.slice(0, 3).map((member) => (
        <Popover
          key={member.userId}
          content={
            <div className="w-60">
              <p className="text-gray-600 mb-2">Project Members</p>
              <ul className="max-h-40 overflow-auto">
                {members.map((m) => (
                  <li key={m.userId} className="p-2 flex items-center gap-2 hover:bg-gray-200">
                    <img className="w-8 h-8 rounded-full" src={m.avatar} alt={m.name} />
                    <span>{m.name}</span>
                    <CloseOutlined
                      className="text-red-500 cursor-pointer ml-auto"
                      onClick={() => handleRemoveUser(m.userId)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          }
          trigger="hover"
        >
          <span>
            <img className="rounded-full w-8 h-8 cursor-pointer" src={member.avatar} alt={member.name} />
          </span>
        </Popover>
      ))}

      {members.length > 3 && (
        <span className="rounded-full w-8 h-8 bg-red-200 text-red-700 flex items-center justify-center">
          +{members.length - 3}
        </span>
      )}

      <Popover
        content={
          <div className="w-60">
            <Search onSearch={handleSearch} allowClear placeholder="Enter User Name" />
            <div className="mt-2">
              {isLoading ? (
                <Spin />
              ) : userList?.data?.content?.length ? (
                <ul className="max-h-40 overflow-auto">
                  {userList.data.content.map((user: Member) => (
                    <li
                      key={user.userId}
                      className="p-2 flex items-center gap-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSelectUser(user.userId)}
                    >
                      <img className="w-8 h-8 rounded-full" src={user.avatar} alt={user.name} />
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No users found.</p>
              )}
            </div>
            <a onClick={() => setIsPopoverOpen(false)} className="block text-blue-500 text-center mt-2">
              Close
            </a>
          </div>
        }
        title="Add users"
        trigger="click"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <span className="bg-blue-500 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer">
          <PlusOutlined className="text-white font-bold text-xl" />
        </span>
      </Popover>
    </div>
  );
};

export default Members;
