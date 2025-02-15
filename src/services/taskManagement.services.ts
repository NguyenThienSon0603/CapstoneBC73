import { apiInstance } from "../constants/apiInstance";

const api = apiInstance();

export const taskServices = {
    getAllProjects: async () => {
        try {
          const response = await api.get(`/api/Project/getAllProject`);    
          return response.data.content
            ? { data: response.data.content.filter((p) => p.id !== null && p.projectName !== null) } // Lọc null từ API
            : { data: [] };
        } catch (error) {
          console.error("❌ Error fetching projects:", error);
          return { data: [] };
        }
      },
    getAllStatuses: async () => {
        const response = await api.get(`/api/Status/getAll`);
        return response.data.content || { data: [] }; 
    },
    getAllPriorities: async () => {
        const response = await api.get(`/api/Priority/getAll`);
        return response.data.content || { data: [] };;
    },
    getAllTaskTypes: async () => {
        const response = await api.get(`/api/TaskType/getAll`);
        return response.data.content || { data: [] };;
    },
    getAllUsers: async () => {
        const response = await api.get(`/api/Users/getUser`);
        return response.data.content || { data: [] };;
    },
    createTask: async (taskData) => {
        const response = await api.post(`/api/Project/createTask`, taskData);
        return response;
    },
};
