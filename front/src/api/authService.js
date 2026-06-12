import { myAxios } from "./axios";

export const authService = {
    login: async (login, password) => {
        const response = await myAxios.post("/api/auth/login", {
            login: login,
            password: password
        });
        return response.data;
    }
};