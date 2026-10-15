import express from "express";

import { incidentRoutes } from "./routes/incident.routes";
import { logger } from "./middlewares/logger.middleware";
import { requestInfo } from "./middlewares/request-info.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

// Middlewares globales.
app.use(logger);
app.use(requestInfo);
app.use(express.json());

// Rutas de la API.
app.use("/api/incidents", incidentRoutes);

// Deben quedar después de todas las rutas.
app.use(notFoundMiddleware);
app.use(errorMiddleware);