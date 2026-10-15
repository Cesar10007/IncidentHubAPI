import type { RequestHandler } from "express";
import { AppError } from "../errors/app-error";

const allowedPriorities = new Set([
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export const validatePriority: RequestHandler = (req, _res, next) => {
  const priority: unknown = req.body?.priority;

  // En PUT se permite omitir campos: conservaría la prioridad actual.
  if (priority === undefined && req.method === "PUT") {
    next();
    return;
  }

  if (typeof priority !== "string" || !allowedPriorities.has(priority)) {
    next(new AppError(400, "Invalid incident priority"));
    return;
  }

  next();
};