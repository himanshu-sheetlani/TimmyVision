import express from "express"
import {protectedRoute} from "../middlewares/auth.js"
import { textAnalyse } from "../controllers/analyze.controller.js";
const analyseRouter = express.Router();


analyseRouter.post("/text-analyse",protectedRoute,textAnalyse);

export default analyseRouter;