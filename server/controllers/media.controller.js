import Upload from "../models/upload.model.js";
import User from "../models/user.model.js";
import { uploadMediaToFirebase } from "../utils/media.operation.js";
import agenda from "../jobs/agenda.js";

// ====================== IMAGE UPLOAD ======================
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
      });
    }

    // Upload image to Firebase
    const imageURL = await uploadMediaToFirebase(req.file);
    if (!imageURL) {
      return res.status(500).json({
        success: false,
        message: "Error in image upload",
      });
    }

    // Save upload record
    const newUpload = await Upload.create({
      userId: req.user._id,
      fileUrl: imageURL,
      fileType: "image",
      status: "processing",
    });

    // Push reference to user.uploads
    await User.findByIdAndUpdate(req.user._id, {
      $push: { uploads: newUpload._id },
    });

    // Queue background job for analysis
    await agenda.now("analyze media", { uploadId: newUpload._id });

    return res.status(200).json({
      success: true,
      message: "Image uploaded. Analysis in progress.",
      uploadId: newUpload._id,
      image: newUpload.fileUrl,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ====================== VIDEO UPLOAD ======================
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Video not found",
      });
    }

    // Upload video to Firebase
    const videoURL = await uploadMediaToFirebase(req.file);
    if (!videoURL) {
      return res.status(500).json({
        success: false,
        message: "Error in video upload",
      });
    }

    // Save upload record
    const newUpload = await Upload.create({
      userId: req.user._id,
      fileUrl: videoURL,
      fileType: "video",
      status: "processing", 
    });

    // Push reference to user.uploads
    await User.findByIdAndUpdate(req.user._id, {
      $push: { uploads: newUpload._id },
    });

    // Queue background job for analysis
    await agenda.now("analyze media", { uploadId: newUpload._id });

    return res.status(200).json({
      success: true,
      message: "Video uploaded. Analysis in progress.",
      uploadId: newUpload._id,
      video: newUpload.fileUrl,
    });
  } catch (error) {
    console.error("Video Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
