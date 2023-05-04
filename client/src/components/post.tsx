import { AuthState, Post, setPost } from "../redux";
import {
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import _appsettings from "../../appsettings.json";

dayjs.extend(relativeTime);

const PostView = ({ post }: { post: Post }) => {
    const username = useSelector((state: AuthState) => state.user?.username);
    const token = useSelector((state: AuthState) => state.token);
    const [likeEffect, setLikeEffect] = useState(false);
    const serverUrl = _appsettings.CONFIG.ENVIRONMENT === "development" ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}` : "";

    const isLiked = username
        ? Boolean(Object.keys(post.likes).includes(username))
        : false;
    const dispatch = useDispatch();

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

    const postDate = dayjs(post.createdAt?.toLocaleString());
    const displayDate = postDate.isAfter(dayjs().subtract(1, "day"))
        ? postDate.fromNow()
        : postDate.format("DD MMM");

    const patchLike = async () => {
        const response = await fetch(
            `${serverUrl}/posts/${post._id}/like`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }),
            }
        );
        const data = await response.json();
        dispatch(setPost({ post: data }));
    };

    return (
        <div className="flex flex-col gap-3 bg-slate-400 p-4 dark:bg-slate-800 sm:rounded-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link to={`/${post.username}`}>
                        <img
                            className="h-14 w-14 rounded-full bg-white object-cover hover:brightness-90"
                            src={profileImage}
                            alt={`${post.username}'s profile pic`}
                        />
                    </Link>
                    <div className="flex flex-col">
                        <Link to={`/${post.username}`}>
                            <span className="font-bold hover:underline">{`${post.firstName} ${post.lastName}`}</span>
                        </Link>
                        <span>@{post.username ?? "username"}</span>
                    </div>
                </div>
                <div>{displayDate} </div>
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
                    <RocketLaunchIcon
                        className={`h-9 w-9 cursor-pointer rounded-md p-2 sm:hover:bg-gray-300 sm:dark:hover:bg-gray-600 
                        ${isLiked && "text-yellow-400"} 
                        ${likeEffect && "animate-like"}`}
                        onClick={() => {
                            patchLike();
                            if (!isLiked) {
                                setLikeEffect(true);
                            }
                        }}
                        onAnimationEnd={() => setLikeEffect(false)}
                    />
                    <span>{Object.keys(post.likes)?.length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                    <span>{Object.keys(post.comments)?.length}</span>
                </div>
                <div className="flex flex-1 items-center justify-center gap-2">
                    <ShareIcon className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                </div>
            </div>
        </div>
    );
};

export default PostView;
