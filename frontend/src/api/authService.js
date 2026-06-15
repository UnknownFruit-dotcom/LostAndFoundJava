import { myAxios } from "./axios";

export const authService = {
    login: async (login, password) => {
        const response = await myAxios.post("/api/auth/login", {
            login: login,
            password: password
        });
        return response.data;
    },

    logout: async () => {
        const response = await myAxios.post("/api/auth/logout", {});
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await myAxios.get('/api/auth/me');
        return response.data;
    }
};