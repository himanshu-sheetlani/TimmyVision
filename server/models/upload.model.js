import mongoose from "mongoose";

const relatedNewsSchema = new mongoose.Schema(
  {
    title: { type: String },
    url: { type: String },
    content: { type: String },
    score: { type: Number },
  },
  { _id: false } // don’t need a separate _id for each related news item
);

const uploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
    },
    fileType: {
      type: String,
      enum: ["image", "video", "text"],
      required: true,
    },
    textContent: {
      type: String,
      default: null,
    },
    prediction: {
      type: String,
      default: "Pending",
    },
    confidence: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
    relatedNews: [relatedNewsSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);
