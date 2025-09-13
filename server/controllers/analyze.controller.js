import Upload from "../models/upload.model.js";
import agenda from "../jobs/agenda.js";

export const textAnalyse = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Text Required" });
    }

    // Create a pending Upload record
    const uploadDoc = new Upload({
      userId: req.user._id,
      fileType: "text",
      textContent: text,
      status: "processing",
      prediction: "Pending",
    });
    await uploadDoc.save();

    // Enqueue background job
    await agenda.now("analyze text", { uploadId: uploadDoc._id, text });

    return res.status(200).json({
      success: true,
      message: "Text submitted for analysis",
      data: uploadDoc,
    });
  } catch (error) {
    console.error("Text Analysis Controller Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
