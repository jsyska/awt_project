import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser, IUserResponse } from "../models/User";
import { Request, Response } from "express";
import { uploadToBlobStorage } from "../helpers/azureBlobStorage";
import _appsettings from "../../appsettings.json";

export const register = async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let imagePath;
    if (req.file) {
      imagePath = await uploadToBlobStorage(
        "user-images",
        `${req.body.username}.${req.file.originalname.split(".")[1]}`,
        req.file.buffer
      );
    } else {
      imagePath =
        "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png";
    }

    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      imagePath: imagePath,
      country: req.body.country,
      occupation: req.body.occupation || "",
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

    const token = jwt.sign({ id: user._id }, _appsettings.CONFIG.JWT_SECRET as string);

    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ errorMessages: err.message });
  }
};
