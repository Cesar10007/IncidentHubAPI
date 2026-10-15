import type { RequestHandler } from "express";
import { generateIncidentId, incidents } from "../data/incidents.data";
import type { CreateIncidentDto } from "../dtos/incident.dto";
import type { Incident, IncidentStatus } from "../models/incident.model";
import { AppError } from "../errors/app-error";
import { assertValidTransition } from "../services/incident-rules";
import { calculateStats } from "../services/incident-stats";

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

export const changeIncidentStatus: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    throw new AppError(404, "Incident not found");
  }

  const nextStatus = req.body?.status as IncidentStatus;

  assertValidTransition(incident.status, nextStatus);
  incident.status = nextStatus;

  res.status(200).json({ ok: true, data: incident });
};

export const getCriticalIncidents: RequestHandler = (_req, res) => {
  const critical = incidents.filter(
    (incident) => incident.priority === "CRITICAL"
  );

  res.status(200).json({
    ok: true,
    total: critical.length,
    data: critical,
  });
};

export const getPendingIncidents: RequestHandler = (_req, res) => {
  const pending = incidents.filter(
    (incident) =>
      incident.status === "OPEN" || incident.status === "IN_PROGRESS"
  );

  res.status(200).json({
    ok: true,
    total: pending.length,
    data: pending,
  });
};

export const getIncidentStats: RequestHandler = (_req, res) => {
  res.status(200).json({
    ok: true,
    data: calculateStats(incidents),
  });
};

export const deleteIncident: RequestHandler = (req, res) => {
  const id = Number(req.params.id);
  const index = incidents.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new AppError(404, "Incident not found");
  }

  incidents.splice(index, 1);
  res.status(204).send();
};