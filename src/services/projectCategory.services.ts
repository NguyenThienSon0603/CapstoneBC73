import { apiInstance } from "../constants/apiInstance";

const api = apiInstance();

export const projectCategoryServices = {
    getAllCategory: () => {
        return api.get('/api/ProjectCategory');
    },
}