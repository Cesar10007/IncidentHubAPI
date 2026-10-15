import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (
    err instanceof SyntaxError &&
    "type" in err &&
    err.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      ok: false,
      message: "Invalid JSON body",
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      ok: false,
      message: err.message,
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    ok: false,
    message: "Internal server error",
  });
};