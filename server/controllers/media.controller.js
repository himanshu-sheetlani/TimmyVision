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
    await agenda.now("analyze image", { uploadId: newUpload._id,image : newUpload.fileUrl });

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

// ====================== TEXT UPLOAD ======================
export const uploadText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Text input is required",
      });
    }

    // Save upload record in DB
    const newUpload = await Upload.create({
      userId: req.user._id,
      fileUrl: null, // no URL for text
      fileType: "text",
      textContent: text,
      prediction: "Pending",
      status: "processing",
    });

    // Optionally: store text in a separate field if needed
    // e.g., add `content` field in schema for storing raw text
    // await Upload.findByIdAndUpdate(newUpload._id, { content: text });

    // Push reference to user.uploads
    await User.findByIdAndUpdate(req.user._id, {
      $push: { uploads: newUpload._id },
    });

    // Queue background job for analysis
    await agenda.now("analyze media", { uploadId: newUpload._id, text });

    return res.status(200).json({
      success: true,
      message: "Text uploaded. Analysis in progress.",
      uploadId: newUpload._id,
      text,
    });
  } catch (error) {
    console.error("Text Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
