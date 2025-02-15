import { apiInstance } from "../constants/apiInstance";

const api = apiInstance();

export const projectMemberServices = {
    // Lấy danh sách thành viên của project
    getAllMemberByProject: (projectID: number) => {
        return api.get(`/api/Users/getUserByProjectId?idProject=${projectID}`);
    },

    // Tìm kiếm user theo từ khoá
    getUserByName: (keyword: string) => {
        return api.get(`/api/Users/getUser?keyword=${keyword}`);
    },

    // Thêm user vào project
    addMemberToProject: (projectID: number, userId: number) => {
        return api.post(`/api/Project/assignUserProject`, {
            projectId: projectID, // Đảm bảo đúng định dạng API yêu cầu
            userId,
        });
    },

    // xóa user khỏi project
    removeUserFromProject: (projectID: number, userId: number) => {
        return api.delete(`/api/Project/removeUserFromProject`, {
          data: { projectId: projectID, userId },
        });
      },   
};
