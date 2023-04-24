import React from "react";
import { Post } from "../redux";
import {
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from "@heroicons/react/24/solid";

const PostView = ({ post }: { post: Post }) => {
    return (
        <div className="flex flex-col gap-3 rounded-md bg-slate-400 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-3">
                <img
                    className="h-14 w-14 rounded-full bg-white"
                    src={post.imagePath}
                    alt={`${post.username}'s profile pic`}
                />
                <div className="flex flex-col">
                    <span className="font-bold">{`${post.firstName} ${post.lastName}`}</span>
                    <span>@{post.username ?? "username"}</span>
                </div>
            </div>
            <div className="text-xl">{post.description}</div>
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
