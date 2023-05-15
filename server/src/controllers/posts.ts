import Post from "../models/Post";
import { Request, Response } from "express";
import User from "../models/User";
import { uploadToBlobStorage } from "../helpers/azureBlobStorage";

export const createPost = async (req: Request, res: Response) => {
    try {
        const { username, description } = req.body;
        const user = await User.findOne({ username: username });

        let imagePath;
        if (req.file) {
            imagePath = await uploadToBlobStorage(
                "posts-images",
                `${Date.now()}-${username}`,
                req.file.buffer
            );
        } else {
            imagePath = "";
        }

        const newPost = new Post({
            userId: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            username,
            description,
            imagePath,
            userImagePath: user?.imagePath,
            likes: {},
            comments: [],
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
        const username = req.params.username;
        const post = await Post.find({ username: username }).sort({
            createdAt: "desc",
        });
        res.status(200).json(post);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const username = req.body.username;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ errorMessages: "Post not found." });
        }

        const isLiked = post.likes.get(username);
        if (isLiked) {
            post.likes.delete(username);
        } else {
            post.likes.set(username, true);
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

export const commentPost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const username = req.body.username;
        const comment = req.body.comment;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ errorMessages: "Post not found." });
        }

        post.comments.push({ username, comment });

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err: any) {
        res.status(404).json({ errorMessages: err.message });
    }
};
