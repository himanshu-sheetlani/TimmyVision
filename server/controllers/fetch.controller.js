import Upload from "../models/upload.model.js";

export const getImageUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ fileType: "image" }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      uploads,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching image uploads", error });
  }
};

export const getVideoUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ fileType: "video" }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      uploads,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching video uploads", error });
  }
};

export const getTextUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({ fileType: "text" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ uploads });
  } catch (error) {
    res.status(500).json({ message: "Error fetching text uploads", error });
  }
};

export const getUploadById = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findById(id);

    if (!upload) {
      return res.status(404).json({ message: "Upload not found" });
    }

    res.status(200).json(upload);
  } catch (error) {
    res.status(500).json({ message: "Error fetching upload", error });
  }
};
