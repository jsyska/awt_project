import React from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../redux";
import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: AuthState) => state.user);
  console.log(user);

  return (
    <div className="flex items-center justify-between bg-slate-400 py-4 px-8 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-3">
        <span
          className="cursor-pointer text-3xl font-bold text-slate-200 hover:text-slate-300"
          onClick={() => navigate("/")}
        >
          NETIZEN SPACE
        </span>
        <div className="flex items-center justify-between gap-4 rounded-lg px-6 py-1 max-md:hidden">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md py-2 px-4 outline-none dark:bg-slate-900"
          />
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer dark:text-white" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-7">
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:text-white max-sm:hidden"
          onClick={() => {
            if (document.documentElement.classList.contains("dark")) {
              document.documentElement.classList.remove("dark");
              localStorage.theme = "light";
            } else {
              document.documentElement.classList.add("dark");
              localStorage.theme = "dark";
            }
          }}
        />
        <ChatBubbleBottomCenterTextIcon
          className="h-6 w-6 cursor-pointer dark:text-white max-sm:hidden"
          onClick={() => navigate(`/chat`)}
        />
        <BellIcon className="h-6 w-6 cursor-pointer dark:text-white max-sm:hidden" />
        <div>
          <img
            src="#"
            alt="Profile pic"
            data-dropdown-toggle="dropdown"
            className="h-12 w-12 cursor-pointer rounded-full bg-slate-500"
            onClick={() => navigate(`/profile/${user?._id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
