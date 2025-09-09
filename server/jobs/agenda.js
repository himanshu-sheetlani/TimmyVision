import Agenda from "agenda";
import Upload from "../models/upload.model.js";
import dotenv from "dotenv"

// dotenv configuration
dotenv.config();

const agenda = new Agenda({
  db: { address: process.env.MONGO_URL, collection: "jobs" },
});

agenda.define("analyze media", async (job) => {
  const { uploadId } = job.attrs.data;

  await new Promise((resolve) => setTimeout(resolve, 20000));

  try {
    const upload = await Upload.findById(uploadId);
    if (!upload) throw new Error("Upload not found");

    // ---- MOCK AI PROCESS ----
    const isDeepfake = Math.random() > 0.5;
    const confidence = Math.floor(Math.random() * 100);

    upload.prediction = isDeepfake ? "Deepfake" : "Authentic";
    upload.confidence = confidence;
    upload.status = "completed";

    await upload.save();
    console.log(`✅ Upload ${uploadId} analyzed successfully`);
  } catch (err) {
    console.error("❌ Job failed:", err);
    await Upload.findByIdAndUpdate(uploadId, { status: "failed" });
  }
});

export default agenda;