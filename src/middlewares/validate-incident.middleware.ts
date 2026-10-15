import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error";

const allowedFields = new Set([
  "title",
  "description",
  "reporter",
  "location",
  "priority",
  "estimatedMinutes",
]);

const textFields = ["title", "description", "reporter", "location"] as const;

export const validateIncident: RequestHandler = (req, _res, next) => {
  const body: unknown = req.body;

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    next(new AppError(400, "Invalid incident data"));
    return;
  }

  const data = body as Record<string, unknown>;
  const fields = Object.keys(data);

  if (fields.length === 0 || fields.some((field) => !allowedFields.has(field))) {
    next(new AppError(400, "Invalid incident data"));
    return;
  }

  if (
    req.method === "POST" &&
    [...allowedFields].some((field) => data[field] === undefined)
  ) {
    next(new AppError(400, "Missing incident fields"));
    return;
  }

  for (const field of textFields) {
    const value = data[field];

    if (
      (req.method === "POST" || value !== undefined) &&
      (typeof value !== "string" || value.trim() === "")
    ) {
      next(new AppError(400, `Invalid ${field}`));
      return;
    }
  }

  next();
};