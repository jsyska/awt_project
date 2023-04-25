import React from "react";
import { Post } from "../redux";
import {
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const PostView = ({ post }: { post: Post }) => {
    const defaultImage =
        "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Astronaut-512.png";

    const validURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    };

    const profileImage = validURL(post.userImagePath)
        ? post.userImagePath
        : defaultImage;
    const image = validURL(post.imagePath) ? post.imagePath : null;

    return (
        <div className="flex flex-col gap-3 rounded-md bg-slate-400 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.userId}`}>
                    <img
                        className="h-14 w-14 rounded-full bg-white hover:brightness-90"
                        src={profileImage}
                        alt={`${post.username}'s profile pic`}
                    />
                </Link>
                <div className="flex flex-col">
                    <Link to={`/profile/${post.userId}`}>
                        <span className="font-bold hover:underline">{`${post.firstName} ${post.lastName}`}</span>
                    </Link>
                    <span>@{post.username ?? "username"}</span>
                </div>
            </div>
            <div className="text-xl">{post.description}</div>
            {image && (
                <img
                    className="mx-auto h-auto rounded-lg"
                    src={image}
                    alt="image description"
                />
            )}
            <div className="w-full border-t-2 border-slate-500 dark:border-slate-100"></div>
            <div className="flex">
                <div className=" flex flex-1 items-center justify-center gap-2">
                    <RocketLaunchIcon className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                    <span>{Object.keys(post.likes).length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                    <span>{Object.keys(post.comments).length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-2">
                    <ShareIcon className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                </div>
            </div>
        </div>
    );
};

export default PostView;
