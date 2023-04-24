import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import UserProfileCard from "../../components/userProfileCard";
import PostView from "../../components/post";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setPosts } from "../../redux";

const HomePage = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: AuthState) => state.posts);
    const token = useSelector((state: AuthState) => state.token);

    useEffect(() => {
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

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col items-center gap-3">
            <Navbar />
            {/* <UserProfileCard /> */}
            <div className="flex w-screen flex-col gap-3 md:w-1/3">
                {posts.map((post) => (
                    <PostView post={post} key={post._id} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
