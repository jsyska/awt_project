import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser, IUserResponse } from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      imagePath: req.file ? req.file.path : "",
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ errorMessages: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user: IUser | null = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ errorMessages: "User does not exist" });

    const isMatch: boolean = await bcrypt.compare(password, user?.password);

    if (!isMatch)
      return res.status(400).json({ errorMessages: "Invalid credentials" });

    const userResponse = user as IUserResponse;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ errorMessages: err.message });
  }
};
