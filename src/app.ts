import express from "express";
import { incidentRoutes } from "./routes/incident.routes";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.use("/api/incidents", incidentRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);