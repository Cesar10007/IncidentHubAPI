import { Request, Response, NextFunction } from "express";
import { assertCriticalTime } from "../services/incident-rules";

export const validateCriticalTime = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { priority, estimatedMinutes } = req.body;

  try {
    assertCriticalTime(priority, estimatedMinutes);
    next();
  } catch (error) {
    next(error);
  }
};