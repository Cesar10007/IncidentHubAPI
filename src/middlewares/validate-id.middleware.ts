import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error";

export const validateId: RequestHandler = (req, _res, next) => {
  const rawId = req.params.id;

  if (typeof rawId !== "string" || !/^\d+$/.test(rawId)) {
    next(new AppError(400, "Invalid incident id"));
    return;
  }

  const id = Number(rawId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    next(new AppError(400, "Invalid incident id"));
    return;
  }

  next();
};