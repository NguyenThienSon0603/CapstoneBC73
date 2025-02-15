import axios, { InternalAxiosRequestConfig } from "axios"

const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MyIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0ODkwODgwMDAwMCIsIm5iZiI6MTcyMTkyNjgwMCwiZXhwIjoxNzQ5MDU2NDAwfQ.4vXhg2MxiO2LMiVclRYdrEmoivaG2QbYXjyqWf9mxGk'

export const apiInstance = (setting?: Partial<InternalAxiosRequestConfig>) => {
    const axiosInstance = axios.create({
        baseURL: "https://jiranew.cybersoft.edu.vn",
    });

    // interceptors: là MiddleWare của axios
    axiosInstance.interceptors.request.use((config) => {
        const accessToken ='eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdHJpbmciLCJuYmYiOjE3Mzg3MjE0MjAsImV4cCI6MTczODcyNTAyMH0.bKkHYC_SrjNV_mxMzy8g09wnPBgfLshThO5UR_54gaU'
        return {
            ...config, //giữ lại config của axios
            ...setting, //thêm config mới được truyền vào
            headers: {
                ...(setting?.headers || {}), //giữ header ở setting truyền vào
                TokenCybersoft: TOKEN_CYBERSOFT, //thêm vào TokenCybersoft: để xác định có phải là học viên của cybersoft
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // Thêm Bearer Token nếu có
            },
        } as unknown as InternalAxiosRequestConfig
    })
    return axiosInstance
} 