import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setPosts } from "../redux";
import PostView from "./post";
import Spinner from "./loadingSpinner";

const Posts = ({
    userId,
    isProfile = false,
}: {
    isProfile?: boolean;
    userId?: string;
}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: AuthState) => state.posts);
    const token = useSelector((state: AuthState) => state.token);
    const [fetching, setFetching] = useState(true);

    const fetchPosts = async () => {
        const response = await fetch("http://localhost:3001/posts/feed", {
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
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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
    }, []);

    return fetching ? (
        <Spinner />
    ) : (
        <div className="flex flex-col gap-3">
            {posts?.length ? (
                posts?.map((post) => <PostView post={post} key={post._id} />)
            ) : (
                <div className="text-center text-xl">
                    This user hasn't posted yet.
                </div>
            )}
        </div>
    );
};

export default Posts;
