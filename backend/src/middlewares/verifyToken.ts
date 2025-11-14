import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export interface AuthenticatedRequest extends Request {
  userId?: string | jwt.JwtPayload;
}

export const verifyToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized: Token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      req.userId = decoded.userId;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(401, "Token expired, please login again");
      }

      if (error.name === "JsonWebTokenError") {
        throw new ApiError(401, "Invalid token");
      }

      throw new ApiError(500, "Authentication error");
    }
  }
);
