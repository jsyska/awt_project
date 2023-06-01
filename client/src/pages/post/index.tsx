import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout";
import { useParams } from "react-router-dom";
import _appsettings from "../../../appSettings.json";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import { Post } from "../../redux";
import PostView from "../../components/post";
import Comment from "../../components/comment";

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
        <div className="flex w-full flex-col gap-2 pt-5">
          <PostView post={post} openComment={true} />
          <div className="flex flex-col-reverse gap-2">
            {post.comments.map((comment) => (
              <div
                key={comment.username + comment.comment}
                className="flex flex-col gap-3 bg-slate-400 p-4 dark:bg-slate-800 sm:rounded-md"
              >
                <Comment
                  username={comment.username}
                  comment={comment.comment}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
};

export default PostPage;
