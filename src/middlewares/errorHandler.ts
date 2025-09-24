import { Request, Response, NextFunction } from "express";

type AppError = {
  status?: number;
  message?: string;
};

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err && typeof err === "object" && err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });

  _next(err);
}
