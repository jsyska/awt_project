import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/feed", verifyToken, getFeedPosts);
router.get("/:username/posts", getUserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;