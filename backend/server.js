import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import seasonalRoutes from "./routes/seasonalRoutes.js";
import herbRoutes from "./routes/herbRoutes.js";

dotenv.config();
connectDB();

const app = express();

// --- Сигурност и общи middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Лимитира заявките към /api, за да предпази от brute-force/spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минути
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// --- Routes ---
app.get("/api/health", (req, res) => res.json({ success: true, status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/seasonal", seasonalRoutes);
app.use("/api/herbs", herbRoutes);

// --- Error handling (винаги последни) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server-ът работи на порт ${PORT} в ${process.env.NODE_ENV || "development"} режим`);
});
