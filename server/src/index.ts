import express, { Express, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { register } from "../controllers/auth";
import authRoutes from "../routes/auth";
import userRoutes from "../routes/users";
import postRoutes from "../routes/posts";
import { verifyToken } from "../middleware/auth";
import { createPost } from "../controllers/posts";
// import User from "../models/User";
// import Post from "../models/Post";
// import { users, posts } from "../data/index";

const app: Express = express();

dotenv.config({ path: path.join(__dirname, "..", ".env") });

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "";

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose
  .connect(MONGO_URL, {
    ...{ useUnifiedTopology: true },
  } as ConnectOptions)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* Seed Data */
    // try {
    //   User.insertMany(users);
    //   Post.insertMany(posts);
    // } catch (err: any) {
    //   console.log(err.message);
    // }
  })
  .catch((error) => console.log(`${error} did not connect`));
