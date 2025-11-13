import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config/config";

const app = express();

app.use(
  cors({
    origin: config.frontendDomain,
  })
);

app.use(express.json());

// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to auth-app" });
});

// Routes

import authRoutes from "./routes/auth.route";

app.use("/api/auth", authRoutes);

// Global error handler
// app.use(globalErrorHandler);

export default app;
