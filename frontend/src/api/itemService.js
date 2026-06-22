import { myAxios } from "./axios";

export const itemService = {
    getAllItems: async () => {
        const response = await myAxios.get("/api/items");
        return response.data;
    },

    searchItems: async (search, status) => {
        const response = await myAxios.get(`/api/items?search=${search}&status=${status}`);
        return response.data;
    },

    deleteItem: async(id) => {
        const response = await myAxios.delete(`/api/items/${id}`);
        return response.data;
    },

    addItem: async (title, description, foundAt, foundBy) => {
        const response = await myAxios.post(`/api/items`, {
            title: title,
            description: description,
            foundAt: foundAt,
            foundBy: foundBy
        });
        return response.data;
    }
};