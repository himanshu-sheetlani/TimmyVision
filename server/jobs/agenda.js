import Agenda from "agenda";
import Upload from "../models/upload.model.js";
import { tavily } from "@tavily/core";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const agenda = new Agenda({
  db: { address: process.env.MONGO_URL, collection: "jobs" },
});

// ------------ TEXT ANALYSIS JOB ------------
agenda.define("analyze text", async (job) => {
  const { uploadId, text } = job.attrs.data;

  try {
    const tvly = tavily({
      apiKey: process.env.TAVILY_API_KEY,
    });

    const response = await tvly.search(text);

    // Get highest score
    let confidence = null;
    if (response?.results?.length > 0) {
      confidence = Math.max(...response.results.map((r) => r.score));
    }

    // Map confidence to prediction
    let prediction = "Pending";
    if (confidence !== null) {
      if (confidence > 0.7) prediction = "Authentic";
      else if (confidence > 0.5) prediction = "Doubtful";
      else if (confidence > 0.3) prediction = "Fake";
      else prediction = "Highly Fake";
    }

    // Build relatedNews from response
    const relatedNews = response.results.map((r) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
    }));

    // Update Upload doc
    await Upload.findByIdAndUpdate(uploadId, {
      confidence,
      prediction,
      status: "completed",
      relatedNews,
    });

    console.log(`✅ Text analysis completed for upload ${uploadId}`);
  } catch (err) {
    console.error("❌ Text analysis job failed:", err);
    await Upload.findByIdAndUpdate(uploadId, { status: "failed" });
  }
});

// ------------ MEDIA ANALYSIS JOB (Mocked Example) ------------
agenda.define("analyze media", async (job) => {
  const { uploadId } = job.attrs.data;

  try {
    await new Promise((resolve) => setTimeout(resolve, 20000)); // simulate delay

    const isDeepfake = Math.random() > 0.5;
    const confidence = Math.floor(Math.random() * 100);

    await Upload.findByIdAndUpdate(uploadId, {
      prediction: isDeepfake ? "Deepfake" : "Authentic",
      confidence,
      status: "completed",
    });

    console.log(`✅ Media analysis completed for upload ${uploadId}`);
  } catch (err) {
    console.error("❌ Media analysis job failed:", err);
    await Upload.findByIdAndUpdate(uploadId, { status: "failed" });
  }
});

agenda.define("analyze image", async (job) => {
  const { uploadId, image } = job.attrs.data;

  try {
    const { data } = await axios.get(
      "https://api.sightengine.com/1.0/check.json",
      {
        params: {
          url: image,
          models: "genai",
          api_user: process.env.SIGHTENGINE_USER,
          api_secret: process.env.SIGHTENGINE_SECRET,
        },
      }
    );

    const confidence = data?.type?.ai_generated ?? null;
    let prediction = "Unknown";

    if (confidence !== null) {
      if (confidence >= 0.85) {
        prediction = "AI Generated";
      } else if (confidence >= 0.4) {
        prediction = "Doubtful";
      } else {
        prediction = "Not AI Generated";
      }
    }

    await Upload.findByIdAndUpdate(uploadId, {
      confidence,
      prediction,
      status: "completed",
    });
  } catch (error) {
    console.error("❌ Image analysis job failed:", error.message);
    await Upload.findByIdAndUpdate(uploadId, { status: "failed" });
  }
});

export default agenda;
