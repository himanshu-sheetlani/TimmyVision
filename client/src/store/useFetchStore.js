import { create } from "zustand";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-hot-toast";

export const useFetchStore = create((set) => ({
  imageUploads: [],
  videoUploads: [],
  textUploads: [],
  imageLoading: false,
  videoLoading: false,
  textLoading: false,
  singleUpload: null,
  loading: false,

  fetchImage: async () => {
    try {
      set({ imageLoading: true });
      const response = await axiosInstance.get("fetch/fetch-image-upload");
      set({
        imageUploads: response.data.uploads,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ imageLoading: false });
    }
  },

  fetchVideo: async () => {
    try {
      set({ videoLoading: true });
      const response = await axiosInstance.get("fetch/fetch-video-upload");
      set({
        videoUploads: response.data.uploads,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ videoLoading: false });
    }
  },

  fetchText: async () => {
    try {
      set({ textLoading: false });
      const response = await axiosInstance.get("fetch/fetch-text-upload");
      set({
        textUploads: response.data.uploads,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ textLoading: false });
    }
  },

  fetchOneUpload: async (id) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get(`fetch/fetch-upload/${id}`);
      set({ singleUpload: response.data });
      toast.success("Upload fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch upload");
    } finally {
      set({ loading: false });
    }
  },
}));
