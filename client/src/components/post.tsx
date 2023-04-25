import React from "react";
import { Post } from "../redux";
import {
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from "@heroicons/react/24/solid";

const PostView = ({ post }: { post: Post }) => {
    const defaultImage = "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Astronaut-512.png";

    const validURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    };

    const profileImage = validURL(post.imagePath) ? post.imagePath : defaultImage;
    const image = validURL(post.imagePath) ? post.imagePath : null;

    return (
        <div className="flex flex-col gap-3 rounded-md bg-slate-400 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-3">
                <img
                    className="h-14 w-14 rounded-full bg-white"
                    src={profileImage}
                    alt={`${post.username}'s profile pic`}
                />
                <div className="flex flex-col">
                    <span className="font-bold">{`${post.firstName} ${post.lastName}`}</span>
                    <span>@{post.username ?? "username"}</span>
                </div>
            </div>
            <div className="text-xl">{post.description}</div>
            {image && <img className="h-auto mx-auto rounded-lg" src={image} alt="image description" />}
            <div className="w-full border-t-2 border-slate-500 dark:border-slate-100"></div>
            <div className="flex">
                <div className="flex flex-1 items-center justify-center gap-3">
                    <RocketLaunchIcon className="h-5 w-5 cursor-pointer hover:text-slate-600" />
                    <span>{Object.keys(post.likes).length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-3">
                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 cursor-pointer hover:text-slate-600" />
                    <span>{Object.keys(post.comments).length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-3">
                    <ShareIcon className="h-5 w-5 cursor-pointer hover:text-slate-600" />
                </div>
            </div>
        </div>
    );
};

export default PostView;
