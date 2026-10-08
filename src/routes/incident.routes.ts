import { Router } from "express";
import {
  changeIncidentStatus,
  createIncident,
  getAllIncidents,
  getCriticalIncidents,
  getIncidentById,
  getIncidentStats,
  getPendingIncidents,
  updateIncident,
} from "../controllers/incident.controller";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { validatePriority } from "../middlewares/validate-priority.middleware";

export const incidentRoutes = Router();

incidentRoutes.get("/", getAllIncidents);
incidentRoutes.post(
  "/",
  validateIncident,
  validatePriority,
  createIncident
);

incidentRoutes.get("/critical", getCriticalIncidents);
incidentRoutes.get("/pending", getPendingIncidents);
incidentRoutes.get("/stats", getIncidentStats);

incidentRoutes.get("/:id", validateId, getIncidentById);
incidentRoutes.put(
  "/:id",
  validateId,
  validateIncident,
  validatePriority,
  updateIncident
);
incidentRoutes.patch("/:id/status", validateId, changeIncidentStatus);