import express from "express";
import {
  getImageUploads,
  getVideoUploads,
  getTextUploads,
  getUploadById
} from "../controllers/fetch.controller.js";
import { protectedRoute } from "../middlewares/auth.js";
const fetchRouter = express.Router();

fetchRouter.get("/fetch-image-upload", protectedRoute, getImageUploads);
fetchRouter.get("/fetch-video-upload", protectedRoute, getVideoUploads);
fetchRouter.get("/fetch-text-upload", protectedRoute, getTextUploads);
fetchRouter.get("/fetch-upload/:id",protectedRoute,getUploadById);

export default fetchRouter;
