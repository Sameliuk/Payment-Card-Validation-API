import { Request, Response, NextFunction } from "express";

export function sanitizeRequest(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.path.startsWith("/card") && req.method === "POST" && req.body) {
    const { card_number, expiration_month, expiration_year } = req.body;

    req.body = {
      card_number,
      expiration_month,
      expiration_year,
    };
  }
  next();
}
