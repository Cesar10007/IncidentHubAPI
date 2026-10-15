import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    return next(new AppError(403, "Forbidden: admin only"));
  }
  next();
};