import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";

export const UseThreadStore = create((set) => ({
  likes: {},
  replies: [],

  giveLike: async (id) => {
    try {
      const response = await axiosInstance.patch(`/thread/like-thread/${id}`);
      set((state) => ({
        likes: {
          ...state.likes,
          [id]: response.data,
        },
      }));
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  },

  comment: async({id , message}) =>{
    try {
        const response = await axiosInstance.post(`/thread/reply-thread/${id}`, { message });
        set({ replies: response.data || [] });
    } catch (error) {
        toast.error("Something went wrong");
        console.log(error)
    }
  }
}));
