import { create } from "zustand";
import { auth, provider, signInWithPopup } from "@/utils/firebase.config";
import { axiosInstance } from "@/utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  signingIn: false,
  loggingOut: false,
  checkingAuth: true,

  signup: async () => {
    try {
      set({ signingIn: true });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      // signup the user in your backend
      const response = await axiosInstance.post("user/signup", { idToken });
      toast.success(response.data.message || "Signup successful");
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ signingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ loggingOut: true });
      const response = await axiosInstance.get("user/logout");
      toast.success(response.data.message || "Logged out successfully");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      set({ loggingOut: false });
    }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("user/check-auth");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Authentication check failed:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
