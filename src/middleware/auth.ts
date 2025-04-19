// middleware/auth.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vibey_secret";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; // You can improve this type later
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
