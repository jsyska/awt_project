import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import UserProfileCard from "../../components/userProfileCard";
import PostView from "../../components/post";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setPosts } from "../../redux";
import AddNewPost from "../../components/addNewPost";

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
    <div className="flex flex-col gap-3">
      <Navbar />
      <div className="flex flex-col gap-8 p-4 md:gap-16 md:flex-row">

        <div className=" h-2/3 order-1 w-full md:w-1/4 md:order-1">
          <UserProfileCard />
        </div>

        <div className="flex w-full flex-col order-3 gap-3 grow md:w-1/3 md:order-2">
          <AddNewPost/>
          {posts?.map((post) => (
            <PostView post={post} key={post._id} />
          ))}
        </div>
        
        <div className="w-1/4 order-2 md:order-3">reklamy</div>

      </div>
    </div>
  );
};

export default HomePage;
