import express from "express";
import {
    getUser,
    getUserFollowers,
    getUserFollowing,
    followUnfollowUser,
    getUsers,
} from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/all", verifyToken, getUsers)
router.get("/:username", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/followings", verifyToken, getUserFollowing);
router.put("/:id/:followerId", verifyToken, followUnfollowUser);

export default router;
