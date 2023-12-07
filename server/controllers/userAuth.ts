import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).send("User not found");
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return res.status(401).send("wrong Credentials");

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    const { password: hashedPassword, ...rest } = validUser;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
