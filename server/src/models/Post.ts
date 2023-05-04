import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    description: string;
    userImagePath: string;
    imagePath: string;
    likes: Map<string, boolean>;
    comments: Map<string, string>;
    createdAt?: Number;
    updatedAt?: Number;
}

const postSchema = new mongoose.Schema<IPost>(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        description: String,
        userImagePath: String,
        imagePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Map,
            of: String,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
