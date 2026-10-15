import type { RequestHandler } from "express";
import { incidents } from "../data/incidents.data";
import type { CreateIncidentDto } from "../dtos/incident.dto";
import { assertCriticalTime } from "../services/incident-rules";

export const validateCriticalTime: RequestHandler = (req, _res, next) => {
  const updates = (req.body ?? {}) as Partial<CreateIncidentDto>;

  const current =
    req.method === "PUT"
      ? incidents.find((item) => item.id === Number(req.params.id))
      : undefined;

  // Si el ID no existe, el controlador se encargará del 404.
  if (req.method === "PUT" && !current) {
    next();
    return;
  }

  const priority = updates.priority ?? current?.priority;
  const estimatedMinutes =
    updates.estimatedMinutes ?? current?.estimatedMinutes;

  try {
    if (priority !== undefined && estimatedMinutes !== undefined) {
      assertCriticalTime(priority, estimatedMinutes);
    }
  } catch (error) {
    next(error);
    return;
  }

  next();
};