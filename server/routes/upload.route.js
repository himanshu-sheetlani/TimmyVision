import express from "express";
import { uploadImage, uploadVideo } from "../controllers/media.controller.js";
import { upload } from "../middlewares/multer.js";
import { protectedRoute } from "../middlewares/auth.js";
const uploadRouter = express.Router();

uploadRouter.post(
  "/upload-image",
  protectedRoute,
  upload.single("image"),
  uploadImage
);
uploadRouter.post(
  "/upload-video",
  protectedRoute,
  upload.single("video"),
  uploadVideo
);

export default uploadRouter;
