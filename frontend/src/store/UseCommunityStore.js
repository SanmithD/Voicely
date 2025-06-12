import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";
import { UseAuthStore } from "./UseAuthStore";

export const UseCommunityStore = create((set) => ({
  communities: null,
  singleCommunity: null,

  createCommunity: async (data) => {
    try {
      const response = await axiosInstance.post(`/community/create`, data);
      toast.success("Community Created");
      set({ communities: response.data });
    } catch (error) {
      toast.error("Cannot create community");
      console.log(error);
    }
  },  

  getCommunities: async () => {
    try {
      const response = await axiosInstance.get(`/community/getCommunity`);
      set({ communities: response.data.response });
      console.log("Community thread", response.data);
    } catch (error) {
      toast.error("Fail to fetch");
      console.log(error);
    }
  },

  joinCommunity: async (communityId) => {
    try {
      const authUser = UseAuthStore.getState().authUser;

      const response = await axiosInstance.post(
        `/community/join/${communityId}`,
        {
          userId: authUser?._id,
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to join community");
      console.log(error);
    }
  },

  getSingleCommunity: async(id) =>{
    try {
        const response = await axiosInstance.get(`/community/get/${id}`);
        set({ singleCommunity: response.data });
    } catch (error) {
        toast.error("Fail to fetch");
        console.log(error);
    }
  }
}));
