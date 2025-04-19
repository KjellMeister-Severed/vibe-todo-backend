import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "vibey_secret";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(400).json({ error: "Email already in use or invalid." });
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) res.status(401).json({ error: "Invalid credentials" });
  else {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  }
};
