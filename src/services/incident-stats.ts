import { Priority, Status } from "./incident-rules";

interface StatsInput {
  priority: Priority;
  status: Status;
  estimatedMinutes: number;
}

export const calculateStats = (incidents: StatsInput[]) => {
  const total = incidents.length;
  const count = (s: Status) => incidents.filter((i) => i.status === s).length;
  const sumMinutes = incidents.reduce((acc, i) => acc + i.estimatedMinutes, 0);

  return {
    total,
    open: count("OPEN"),
    inProgress: count("IN_PROGRESS"),
    resolved: count("RESOLVED"),
    critical: incidents.filter((i) => i.priority === "CRITICAL").length,
    averageEstimatedMinutes: total === 0 ? 0 : Math.round(sumMinutes / total),
  };
};