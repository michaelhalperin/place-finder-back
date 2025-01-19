import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import placeRoutes from "./routes/placeRoutes";
import userRoutes from "./routes/userRoutes";
import questionnaireRoutes from "./routes/questionnaireRoutes";
import { config } from "./config/config";
import authRoutes from "./routes/auth";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);
connectDB();

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.env} mode`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  server.close(() => process.exit(1));
});

export default app;
