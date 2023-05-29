import User from "../models/User";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        res.status(200).json(user);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const getUserFollowers = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user?.followers) {
            return res
                .status(404)
                .json({ errorMessages: "Followers not found." });
        }

        const followers = await Promise.all(
            user.followers.map((followerId) => User.findById(followerId))
        );

        const formatted = followers.map((follower) => {
            return {
                _id: follower?._id,
                firstName: follower?.firstName,
                lastName: follower?.lastName,
                email: follower?.email,
                imagePath: follower?.imagePath,
                occupation: follower?.occupation,
                country: follower?.country,
                username: follower?.username
            };
        });

        res.status(200).json(formatted);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const getUserFollowing = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user?.followings) {
            return res
                .status(404)
                .json({ errorMessages: "followings not found." });
        }

        const followings = await Promise.all(
            user.followings.map((followerId) => User.findById(followerId))
        );

        const formatted = followings.map((follower) => {
            return {
                _id: follower?._id,
                firstName: follower?.firstName,
                lastName: follower?.lastName,
                email: follower?.email,
                imagePath: follower?.imagePath,
                occupation: follower?.occupation,
                country: follower?.country,
                username: follower?.username
            };
        });

        res.status(200).json(formatted);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const followUnfollowUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const followerId = req.params.followerId;
        const user = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!user) {
            return res.status(404).json({ errorMessages: "User not found." });
        }

        if (!follower) {
            return res
                .status(404)
                .json({ errorMessages: "Follower not found." });
        }

        if (user.followings.includes(followerId)) {
            user.followings = user.followings.filter((id) => id !== followerId);
            follower.followers = follower.followers.filter((id) => id !== userId);
        } else {
            user.followings.push(followerId);
            follower.followers.push(userId);
        }

        await user.save();
        await follower.save();

        const followings = await Promise.all(
            user.followings.map((followerId) => User.findById(followerId))
        );

        const formatted = followings.map((follower) => {
            return {
                _id: follower?._id,
                firstName: follower?.firstName,
                lastName: follower?.lastName,
                email: follower?.email,
                imagePath: follower?.imagePath,
                occupation: follower?.occupation,
                country: follower?.country,
                username: follower?.username
            };
        });

        res.status(200).json(formatted);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};
