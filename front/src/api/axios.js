import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const myAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// myAxios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             window.location.href = '/auth/login';
//         }
//         return Promise.reject(error);
//     }
// );