import { myAxios } from "./axios";

export const itemService = {
    getAllItems: async () => {
        try {
            const response = await myAxios.get("/api/items");
            return response.data;
        } catch (error) {
            console.error("Error fetching items:", error);
            throw error;
        }
    },
    deleteItem: async(id) => {
        try {
            const response = await myAxios.delete(`/api/items/${id}`);
            return response.data;
        } catch (error) {
            console.error(`error deleting item ${id}:`, error);
            throw error;
        }
    },
};