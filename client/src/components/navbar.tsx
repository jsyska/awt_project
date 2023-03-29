import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { AuthState, setLogout } from "../redux";
import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const user = useSelector((state: AuthState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {};

  return (
    <div className="flex items-center justify-between bg-slate-400 py-4 px-8 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-3">
        <Link to="/">
          <span className="cursor-pointer text-3xl font-bold text-slate-200 hover:text-slate-300">
            NETIZEN SPACE
          </span>
        </Link>
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
        <Link to="/chat">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6 cursor-pointer dark:text-white max-sm:hidden" />
        </Link>
        <BellIcon className="h-6 w-6 cursor-pointer dark:text-white max-sm:hidden" />

        <Menu as="div" className="relative inline-block">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-100 px-4 py-2 hover:bg-slate-200 dark:bg-slate-900  dark:hover:bg-opacity-80">
              {`${user?.firstName} ${user?.lastName}`}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Menu.Items
            className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-slate-200 rounded-md bg-white
           shadow-lg focus:outline-none dark:divide-slate-500 dark:bg-slate-700"
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active && "bg-slate-300 dark:bg-slate-600"}
                   group flex w-full items-center rounded-md px-2 py-2 text-slate-900 dark:text-white`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active && "bg-slate-300 dark:bg-slate-600"}
                 group flex w-full items-center rounded-md px-2 py-2 text-slate-900 dark:text-white`}
                  >
                    Get Help
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active && "bg-slate-300 dark:bg-slate-600"}
                group flex w-full items-center rounded-md px-2 py-2 text-slate-900 dark:text-white`}
                    onClick={() => dispatch(setLogout())}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
