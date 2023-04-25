import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setPosts } from "../redux";
import PostView from "./post";

const Posts = ({
    userId,
    isProfile = false,
}: {
    isProfile?: boolean;
    userId?: number;
}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state: AuthState) => state.posts);
    const token = useSelector((state: AuthState) => state.token);

    const fetchPosts = async () => {
        const response = await fetch("http://localhost:3000/posts/feed", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const fetchSingleUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3000/posts/${userId}/posts`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            fetchSingleUserPosts();
        } else {
            fetchPosts();
        }
    }, []);

    return (
        <div className="flex flex-col gap-3">
            {posts?.map((post) => (
                <PostView post={post} key={post._id} />
            ))}
        </div>
    );
};

export default Posts;
