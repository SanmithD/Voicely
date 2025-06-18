import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.lib";


export const UseAuthStore = create((set) => ({
  isSigning: false,
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
  isCheckUser: true,
  isLogging: false,
  isProfile: false,

  signup: async (data) => {
    set({ isSigning: true });
    try {
      const response = await axiosInstance.post(`/auth/signup`, data);
      set({ authUser: response.data });
      localStorage.setItem('auth-user',JSON.stringify(response.data))
    } catch (error) {
      toast.error("Failed to signup");
      console.log(error);
    } finally {
      set({ isSigning: false });
    }
  },

  login: async (data) => {
    set({ isLogging: true });
    try {
      const response = await axiosInstance.post(`/auth/login`, data);
      set({ authUser: response.data });
      localStorage.setItem('auth-user',JSON.stringify(response.data))
      toast.success("Logging to the Voicely");
    } catch (error) {
      console.log(error);
      toast.error("Fail to login");
    } finally {
      set({ isLogging: false });
    }
  },

  profile: async () => {
    set({ isProfile: true });
    try {
      const response = await axiosInstance.get(`/auth/profile`);
      set({ authUser: response.data });
    } catch (error) {
      toast.error("Fail to fetch profile");
      console.log(error);
    } finally {
      set({ isProfile: false });
    }
  },

  logout: async () => {
    try {
      set({ authUser: null });
      toast.success("Logout successfully");
      localStorage.removeItem('auth-user')
    } catch (error) {
      console.log(error);
      toast.error("Unable to logout");
    }
  },

  deleteUser: async () => {
    try {
      const response = await axiosInstance.delete("/auth/delete");
      set({ authUser: null });
      toast.success("Account deleted successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail to delete");
    }
  },
}));
