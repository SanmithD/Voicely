import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";
import { UseAuthStore } from "./UseAuthStore";

export const UseThreadStore = create((set)=>({
    like: null,

    giveLike : async(id) =>{
        try {
            const authUser = UseAuthStore.getState().authUser;
            const response = await axiosInstance.patch(`/thread/like-thread/${id}`,{
                userId: authUser?._id
            });
            set({ like: response.data });
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
}))