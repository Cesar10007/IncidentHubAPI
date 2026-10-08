import { Router } from "express";
import {
  changeIncidentStatus,
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
} from "../controllers/incident.controller";

export const incidentRoutes = Router();

incidentRoutes.get("/", getAllIncidents);
incidentRoutes.post("/", createIncident);
incidentRoutes.get("/:id", getIncidentById);
incidentRoutes.put("/:id", updateIncident);
incidentRoutes.patch("/:id/status", changeIncidentStatus);