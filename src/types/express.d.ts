declare namespace Express {
  interface Request {
    requestInfo?: {
      timestamp: string;
      method: string;
      path: string;
    };
    user?: {
      token: string;
      role: "admin" | "technician";
    };
  }
}