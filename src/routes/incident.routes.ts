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

export const incidentRoutes = Router();

incidentRoutes.get("/", getAllIncidents);
incidentRoutes.post("/", createIncident);

incidentRoutes.get("/critical", getCriticalIncidents);
incidentRoutes.get("/pending", getPendingIncidents);
incidentRoutes.get("/stats", getIncidentStats);

incidentRoutes.get("/:id", getIncidentById);
incidentRoutes.put("/:id", updateIncident);
incidentRoutes.patch("/:id/status", changeIncidentStatus);