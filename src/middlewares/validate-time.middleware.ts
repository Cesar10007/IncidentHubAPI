import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error";

export const validateTime: RequestHandler = (req, _res, next) => {
  const minutes: unknown = req.body?.estimatedMinutes;

  if (minutes === undefined && req.method === "PUT") {
    next();
    return;
  }

  if (
    typeof minutes !== "number" ||
    !Number.isFinite(minutes) ||
    minutes <= 0 ||
    minutes > 480
  ) {
    next(new AppError(400, "Invalid estimatedMinutes"));
    return;
  }

  next();
};