import express from "express";
import {
    getUser,
    getUserFollowers,
    getUserFollowing,
    followUnfollowUser,
} from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/:username", verifyToken, getUser);
router.get("/:username/followers", verifyToken, getUserFollowers);
router.get("/:username/followings", verifyToken, getUserFollowing);
router.put("/:username/:followerUsername", verifyToken, followUnfollowUser);

export default router;
