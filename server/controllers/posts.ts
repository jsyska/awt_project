import Post from "../models/Post";
import { Request, Response } from "express";
import User from "../models/User";
import { uploadToBlobStorage } from "../helpers/azureBlobStorage";

export const createPost = async (req: Request, res: Response) => {
    try {
        const { userId, description } = req.body;
        const user = await User.findById(userId);

        let imagePath;
        if (req.file) {
          imagePath = await uploadToBlobStorage(
            "posts-images",
            `${req.file.filename}`,
            req.file.buffer
          );
        } else {
          imagePath = "";
        }

        const newPost = new Post({
            userId,
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
            description,
            imagePath,
            userImagePath: user?.imagePath,
            likes: {},
            comments: {},
        });
        await newPost.save();
        const post = await Post.find().sort({ createdAt: "desc" });
        res.status(201).json(post);
    } catch (err: any) {
        res.status(409).json({ errorMessages: err.message });
    }
};

export const getFeedPosts = async (req: Request, res: Response) => {
    try {
        const post = await Post.find().sort({ createdAt: "desc" });
        res.status(200).json(post);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const getUserPosts = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const post = await Post.find({ userId }).sort({ createdAt: "desc" });
        res.status(200).json(post);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ errorMessages: "Post not found." });
        }

        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};
