// import axios from "axios";
import { apiInstance } from "../constants/apiInstance";

const api = apiInstance();

export const projectManagementServices = {
    fetchProjects: () => {
        return api.get('/api/Project/getAllProject');
    },

    deleteProject: (idProject: number) => {
        return api.delete(`/api/Project/deleteProject?projectId=${idProject}`);
    },

    createProject: (newProject: ProjectRequest) => {
        return api.post('/api/Project/createProjectAuthorize', newProject);
    },

    updateProject: (idProject: number, updatedProject: ProjectRequest) => {
        return api.put(`/api/Project/updateProject?projectId=${idProject}`, updatedProject);
    },

    getProjectDetail: (projectId: number) => {
        return api.get(`/api/Project/getProjectDetail?id=${projectId}`);
    },
}