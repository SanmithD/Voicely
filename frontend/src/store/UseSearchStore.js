import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";

export const useSearchStore = create((set, get) => ({
  recent: [],
  searchItem: [],
  searchText: "",

  search: async(data) => {
    try {
      const response = await axiosInstance.get(`/find/search?data=${encodeURIComponent(data)}`);
      set({ searchItem : response.data.result });
    } catch (error) {
      toast.error("Cannot search");
      console.error(error);
    }
  },

  saveHistory : async(threadId) =>{
    console.log("thread id", threadId)
    try {
        await axiosInstance.post(`/find/saveHistory/${threadId}`);
    } catch (error) {
        toast.error("Something went wrong");
        console.log(error)
    }
  },

  getRecentSearch: async() => {
    try {
      const response = await axiosInstance.get(`/find/recent`);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to get recent searches", error);
      toast.error("Something went wrong");
    }
  },

  clearHistory : async({ id }) =>{
    try {
        await axiosInstance.delete(`/find/remove/${id}`);
        toast.success("Cleared");
        await get().getRecentSearch();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }
}));
