// Description: This is the entry point for the server application.

// dotenv configuration
import dotenv from "dotenv";
dotenv.config();

// Importing necessary modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import agenda from "./jobs/agenda.js";

// Database connection
import { connectDb } from "./db/connect.js";

// Logger configuration
import logger from "./utils/logger.js";

// Express app
const app = express();

// Frontend URL
const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : process.env.FRONTEND_URL;

// Middlewares
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

(async function () {
  await agenda.start();
  console.log("🚀 Agenda started");
})();

// Morgan logger setup ( currently commented out due to storage issues )
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseTime] = message.split(" ");
        const logObject = {
          method,
          url,
          status,
          responseTime,
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// Routes
import authRouter from "./routes/auth.route.js";
import uploadRouter from "./routes/upload.route.js";
import fetchRouter from "./routes/fetch.route.js";
import analyseRouter from "./routes/analyse.route.js";
app.use("/api/v1/user", authRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/fetch", fetchRouter);
app.use("/api/v1/analyse", analyseRouter);

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Port
const PORT = process.env.PORT || 4000;

// App listening
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error);
    console.log(error);
  });
