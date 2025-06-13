import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";
import { UseAuthStore } from "./UseAuthStore";

export const UseBookmarkStore = create((set)=>({
    bookmark: [],

    addBookmark: async(id) =>{
        try {
            const response = await axiosInstance.patch(`/bookmark/set/${id}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    },

    fetchBookmark: async() =>{
        try {
            const authUser = UseAuthStore.getState().authUser
            const response = await axiosInstance.get(`/bookmark/get`,{
                params: { userId: authUser?._id }
            });
            set({ bookmark: response.data.response });
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
}));