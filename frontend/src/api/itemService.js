import { myAxios } from "./axios";

export const itemService = {
    getAllItems: async () => {
        const response = await myAxios.get("/api/items");
        return response.data;
    },

    searchItems: async (search = '', status = null) => {
        const params = {};

        if (search?.trim()) params.search = search.trim();
        if (status !== null && status !== undefined) params.status = status;

        const response = await myAxios.get('/api/items', { params });
        return response.data;
    },

    deleteItem: async(id) => {
        const response = await myAxios.delete(`/api/items/${id}`);
        return response.data;
    },
    
    toggleItemStatus: async (id) => {
        const response = await myAxios.patch(`/api/items/${id}/toggle`);
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