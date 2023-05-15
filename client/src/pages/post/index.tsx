import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout";
import { useParams } from "react-router-dom";
import _appsettings from "../../../appSettings.json";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import { Post } from "../../redux";
import PostView from "../../components/post";

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null);

    const { postId } = useParams();
    const token = useSelector((state: AuthState) => state.token);
    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

    const getPost = async () => {
        const response = await fetch(`${serverUrl}/posts/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPost(data);
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <MainLayout>
            {post ? (
                <>
                    {post.description}
                    {post.imagePath && (
                        <img
                            className="mx-auto h-auto rounded-lg"
                            src={post.imagePath}
                            alt="image description"
                        />
                    )}
                    {post.comments.map((comment) => (
                        <div key={comment.username + comment.comment}>
                            {comment.username} - {comment.comment}
                        </div>
                    ))}
                </>
            ) : (
                <Spinner />
            )}
        </MainLayout>
    );
};

export default PostPage;
