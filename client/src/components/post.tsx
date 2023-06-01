import { AuthState, Post, setPost } from "../redux";
import {
    RocketLaunchIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import _appsettings from "../../appSettings.json";
import Spinner from "./loadingSpinner";
import toast, { Toaster } from 'react-hot-toast';


dayjs.extend(relativeTime);

const PostView = ({ post }: { post: Post }) => {
    const username = useSelector((state: AuthState) => state.user?.username);
    const token = useSelector((state: AuthState) => state.token);
    const [likeEffect, setLikeEffect] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [comment, setComment] = useState("");
    const [commentUploading, setCommentUploading] = useState(false);

    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

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
        const response = await fetch(`${serverUrl}/posts/${post._id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
        });
        const data = await response.json();
        dispatch(setPost({ post: data }));
    };

    const postComment = async () => {
        setCommentUploading(true);
        const response = await fetch(`${serverUrl}/posts/${post._id}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, comment: comment }),
        });
        const data = await response.json();
        dispatch(setPost({ post: data }));
        setCommentUploading(false);
        setComment("");
        setCommenting(false);
    };

    const shareToast = () => toast('Link copied to clipboard', {
        duration: 2000,
        position: 'top-center',
        icon: '📋',
        style: {
            background: '#333',
            color: '#fff',
        },

    });


    return (
        <div>
            <Toaster />
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
                <Link to={`/status/${post._id}`}>
                    <div className="text-xl">{post.description}</div>
                </Link>
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
                        <ChatBubbleBottomCenterTextIcon
                            onClick={() => setCommenting(!commenting)}
                            className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600"
                        />
                        <span>{Object.keys(post.comments)?.length}</span>
                    </div>
                    <div className="flex flex-1 items-center justify-center gap-2">
                        <ShareIcon onClick={() => {
                            shareToast()
                            navigator.clipboard.writeText(`${window.location.origin}/status/${post._id}`)
                        }} 
                        className="h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600" />
                    </div>
                </div>
                {commenting && (
                    <div className="flex items-center gap-5 px-4">
                        <input
                            placeholder="Add a comment..."
                            type="text"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className="w-full rounded-lg border-2 border-slate-600 bg-slate-700 p-2"
                        />
                        {commentUploading ? (
                            <Spinner />
                        ) : (
                            <PaperAirplaneIcon
                                onClick={postComment}
                                className={`h-9 w-9 cursor-pointer rounded-md p-2 hover:bg-gray-300 dark:hover:bg-gray-600`}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostView;
