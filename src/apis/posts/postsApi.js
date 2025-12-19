import { api } from "../config/axiosConfig";

export const createPost = (formData) => {
    return api.post("/api/posts", formData);
} // 일관성의 중요성 -> /api/posts

