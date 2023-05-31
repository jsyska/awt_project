import React, { useEffect, useState } from "react";
import _appsettings from "../../appSettings.json";
import { useSelector } from "react-redux";
import { AuthState, User } from "../redux";
import { Link } from "react-router-dom";

type CommentProps = {
  username: string;
  comment: string;
};

const Comment = ({ comment, username }: CommentProps) => {
  const [user, setUser] = useState<User | null>(null);
  const token = useSelector((state: AuthState) => state.token);
  const serverUrl =
    _appsettings.CONFIG.ENVIRONMENT === "development"
      ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
      : "";

  const getUser = async () => {
    const response = await fetch(`${serverUrl}/users/${username}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3 bg-slate-400 dark:bg-slate-800 sm:rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/${user.username}`}>
            <img
              className="h-14 w-14 rounded-full bg-white object-cover hover:brightness-90"
              src={user.imagePath}
              alt={`${user.username}'s profile pic`}
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/${user.username}`}>
              <span className="font-bold hover:underline">{`${user.firstName} ${user.lastName}`}</span>
            </Link>
            <span>@{user.username ?? "username"}</span>
          </div>
        </div>
      </div>
      <span>{comment}</span>
    </div>
  );
};

export default Comment;
