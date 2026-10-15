import { Router } from "express";
import {
  changeIncidentStatus,
  createIncident,
  deleteIncident,
  getAllIncidents,
  getCriticalIncidents,
  getIncidentById,
  getIncidentStats,
  getPendingIncidents,
  updateIncident,
} from "../controllers/incident.controller";

import { auth } from "../middlewares/auth.middleware";
import { admin } from "../middlewares/admin.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { validatePriority } from "../middlewares/validate-priority.middleware";
import { validateTime } from "../middlewares/validate-time.middleware";
import { validateCriticalTime } from "../middlewares/validate-critical-time.middleware";

export const incidentRoutes = Router();

// Consultas públicas.
incidentRoutes.get("/", getAllIncidents);

// Las rutas específicas deben declararse antes de /:id.
incidentRoutes.get("/critical", getCriticalIncidents);
incidentRoutes.get("/pending", getPendingIncidents);
incidentRoutes.get("/stats", getIncidentStats);

incidentRoutes.get("/:id", validateId, getIncidentById);

// Creación protegida y validada.
incidentRoutes.post(
  "/",
  auth,
  validateIncident,
  validatePriority,
  validateTime,
  validateCriticalTime,
  createIncident
);

// Actualización protegida y validada.
incidentRoutes.put(
  "/:id",
  auth,
  validateId,
  validateIncident,
  validatePriority,
  validateTime,
  validateCriticalTime,
  updateIncident
);

// El controller valida el estado solicitado y su transición.
incidentRoutes.patch(
  "/:id/status",
  auth,
  validateId,
  changeIncidentStatus
);

// Solo administradores pueden eliminar.
incidentRoutes.delete(
  "/:id",
  auth,
  admin,
  validateId,
  deleteIncident
);