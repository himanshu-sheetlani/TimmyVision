import { create } from "zustand";
import { axiosInstance } from "@/utils/axios";
import { toast } from "react-hot-toast";

export const useUploadStore = create((set) => ({
  imageUploading: false,
  videoUploading: false,
  textUploading: false,

  // Upload Image
  uploadImage: async (file) => {
    try {
      set({ imageUploading: true });

      const formData = new FormData();
      formData.append("image", file);

      await axiosInstance.post("upload/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      set({ imageUploading: false });
    }
  },

  // Upload Video
  uploadVideo: async (file) => {
    try {
      set({ videoUploading: true });

      const formData = new FormData();
      formData.append("video", file);

      await axiosInstance.post("upload/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Video uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Video upload failed");
    } finally {
      set({ videoUploading: false });
    }
  },

  // Upload Text
  uploadText: async (text) => {
    try {
      set({ textUploading: true });

      await axiosInstance.post("analyse/text-analyse", {  text });

      toast.success("Text uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Text upload failed");
    } finally {
      set({ textUploading: false });
    }
  },
}));
