import { Request, Response, NextFunction } from "express";

export const requestInfo = (req: Request, res: Response, next: NextFunction): void => {
  req.requestInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
  };
  next();
};