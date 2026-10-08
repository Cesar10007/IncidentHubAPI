import type { RequestHandler } from "express";
import { generateIncidentId, incidents } from "../data/incidents.data";
import type { CreateIncidentDto } from "../dtos/incident.dto";
import type { Incident } from "../models/incident.model";
import { AppError } from "../errors/app-error";

export const getAllIncidents: RequestHandler = (_req, res) => {
  res.status(200).json({
    ok: true,
    total: incidents.length,
    data: incidents,
  });
};

export const getIncidentById: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    throw new AppError(404, "Incident not found");
  }

  res.status(200).json({ ok: true, data: incident });
};

export const createIncident: RequestHandler = (req, res) => {
  const {
    title,
    description,
    reporter,
    location,
    priority,
    estimatedMinutes,
  } = req.body as CreateIncidentDto;

  const newIncident: Incident = {
    id: generateIncidentId(),
    title,
    description,
    reporter,
    location,
    priority,
    status: "OPEN",
    estimatedMinutes,
    createdAt: new Date().toISOString(),
  };

  incidents.push(newIncident);

  res.status(201).json({ ok: true, data: newIncident });
};

export const updateIncident: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    throw new AppError(404, "Incident not found");
  }

  const updates = req.body as Partial<CreateIncidentDto>;

  if (updates.title !== undefined) incident.title = updates.title;
  if (updates.description !== undefined) incident.description = updates.description;
  if (updates.reporter !== undefined) incident.reporter = updates.reporter;
  if (updates.location !== undefined) incident.location = updates.location;
  if (updates.priority !== undefined) incident.priority = updates.priority;
  if (updates.estimatedMinutes !== undefined) {
    incident.estimatedMinutes = updates.estimatedMinutes;
  }

  res.status(200).json({ ok: true, data: incident });
};