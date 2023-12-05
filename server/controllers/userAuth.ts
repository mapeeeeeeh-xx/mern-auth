import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const userSignUp = async (req: Request<any, any, registerUser>, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, email, password: hashedPassword };
  try {
    const saveUser = await User.create(newUser);
    res.status(201).json({ message: "User registered successfully.", user: saveUser });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
