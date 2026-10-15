import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

const VALID_TOKENS = ["instructor-token", "technician-token"];

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorized"));
  }

  const token = header.split(" ")[1];

  if (!VALID_TOKENS.includes(token)) {
    return next(new AppError(401, "Unauthorized"));
  }

  req.user = { token, role: token === "instructor-token" ? "admin" : "technician" };
  next();
};