import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, Post, setPosts, User } from "../redux";
import PostView from "./post";
import Spinner from "./loadingSpinner";
import _appsettings from "../../appSettings.json";

const Posts = ({
    username,
    isProfile = false,
    user
}: {
    isProfile?: boolean;
    username?: string;
    user?: User;
}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: AuthState) => state.posts);
    const following = useSelector((state: AuthState) => state.user?.followings);
    const followingIds = following?.map((f: any) => f._id);
    const followingPosts = posts.filter((post: Post) => followingIds?.includes(post.userId))
    const token = useSelector((state: AuthState) => state.token);
    const [fetching, setFetching] = useState(true);
    const [showAll, setShowAll] = useState(true);
    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

    const fetchPosts = async () => {
        const response = await fetch(`${serverUrl}/posts/feed`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setFetching(false);
    };

    const fetchSingleUserPosts = async () => {
        const response = await fetch(`${serverUrl}/posts/${username}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setFetching(false);
    };

    useEffect(() => {
        if (isProfile) {
            fetchSingleUserPosts();
        } else {
            fetchPosts();
        }
    }, [user]);

    return fetching ? (
        <Spinner />
    ) : (
        <div className="flex w-full flex-col gap-3">
            {!isProfile && <div className="flex flex-row sticky top-14 left-0 sm:top-0 bg-slate-900">
                <span onClick={() => setShowAll(true)} className={`${showAll ? " border-b-2 border-b-white" : "dark:text-gray-400"} text-xl w-1/2 text-center p-3 font-semibold hover:bg-slate-800 cursor-pointer`}>All</span>
                <span onClick={() => setShowAll(false)} className={`${!showAll ? " border-b-2 border-b-white" : "dark:text-gray-400"} text-xl w-1/2 text-center p-3 font-semibold hover:bg-slate-800 cursor-pointer`}>Following</span>
            </div>}
            {(showAll && posts?.length > 0) &&
                posts?.map((post) => <PostView post={post} key={post._id} />)
            }
            {(!showAll && followingPosts?.length) &&
                followingPosts?.map((post) => <PostView post={post} key={post._id} />)
            }
            {(isProfile && !posts?.length) && (
                <div className="text-center text-xl">
                    This user hasn't posted yet.
                </div>
            )}
        </div>
    );
};

export default Posts;
