import { AppError } from "../errors/app-error";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export const MAX_CRITICAL_MINUTES = 60;

const ALLOWED_TRANSITIONS: Record<Status, Status[]> = {
  OPEN: ["IN_PROGRESS", "RESOLVED"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: [],
};

export const assertCriticalTime = (
  priority: Priority,
  estimatedMinutes: number
): void => {
  if (priority === "CRITICAL" && estimatedMinutes > MAX_CRITICAL_MINUTES) {
    throw new AppError(
      400,
      `Critical incidents cannot exceed ${MAX_CRITICAL_MINUTES} minutes`
    );
  }
};

export const assertValidTransition = (from: Status, to: Status): void => {
  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw new AppError(400, `Invalid status transition: ${from} -> ${to}`);
  }
};