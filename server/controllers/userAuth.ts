import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const userSignUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, email, password: hashedPassword };

    const saveUser = await User.create(newUser);

    res.status(201).json({ message: "User registered successfully.", user: saveUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
