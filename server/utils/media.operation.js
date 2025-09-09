import fs from "fs";
import { bucket } from "./firebase.config.js";

// Image upload function to firebase
const uploadMediaToFirebase = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const localFilePath = file.path;
    const uniqueFileName = `${Date.now()}_${file.originalname}`;
    const firebaseFile = bucket.file(uniqueFileName);

    await firebaseFile.save(fs.readFileSync(localFilePath), {
      metadata: { contentType: file.mimetype },
    });

    await firebaseFile.makePublic();
    const publicUrl = firebaseFile.publicUrl();

    fs.unlinkSync(localFilePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export { uploadMediaToFirebase };
