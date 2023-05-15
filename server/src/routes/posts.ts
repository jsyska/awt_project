import express from "express";
import {
    getFeedPosts,
    getSinglePost,
    getUserPosts,
    likePost,
    commentPost,
} from "../controllers/posts";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/feed", verifyToken, getFeedPosts);
router.get("/:username/posts", getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);
router.get("/:id", getSinglePost);

export default router;
