import { NextFunction, Request, Response } from "express";

export async function signUpMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).json({ message: "Username, email, and password are required." });
  else next();
}
