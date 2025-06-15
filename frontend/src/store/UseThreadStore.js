import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";
import { UseAuthStore } from "./UseAuthStore";
import { UseCommunityStore } from "./UseCommunityStore";

export const UseThreadStore = create((set, get) => ({
  likes: {},
  replies: [],
  allThreads: null,
  singleThread: [],

  sendNewThread: async({data}) =>{
    try {
      const communityPost = await UseCommunityStore.getState().getSingleCommunity();
      await axiosInstance.post(`/thread/post-community-thread/${data.communityId}`,data);
      toast.success("Post posted");
      await get().getSingleThread();
      await communityPost;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  },

  deleteThreadPost: async(id) =>{
    try {
      console.log("store", id)
      const authUser = UseAuthStore.getState().authUser;
      const response = await axiosInstance.delete(`/thread/delete-thread/${id}`,{
        data: { userId: authUser?.profile._id }
      });
      console.log(response.data);
      toast.success("Thread deleted");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  },

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
  },

  shareThread: async(data) =>{
    if(navigator.share){
      try {
        await navigator.share({
          title: "Check this out!",
          text: data,
          url: window.location.href
        })
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }else{
      toast.error("Post not found");
    }
  },

  
  getSingleThread: async() =>{
    try {
      const response = await axiosInstance.get(`/thread/get-singleAll-thread`);
      set({ singleThread: response.data.response })
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    }
  },

  postSingleThread: async({data}) =>{
    try {
      await axiosInstance.post(`/thread/post-single-thread`,data);
      await get().getSingleThread();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  },
}));
