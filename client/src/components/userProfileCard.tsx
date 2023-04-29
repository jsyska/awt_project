import React from "react";
import { useSelector } from "react-redux";
import { User } from "../redux";
import { AuthState } from "../redux";
import {
    BriefcaseIcon,
    MapPinIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const UserProfileCard = ({ user }: { user: User }) => {
    const defaultImage =
        "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Astronaut-512.png";

    const validURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    };

    const profileImage = validURL(user.imagePath)
        ? user.imagePath
        : defaultImage;

    return (
        <div className="mt-4 flex w-full flex-col rounded-lg bg-slate-400 p-7 dark:bg-slate-800 ">
            <div className=" flex w-full flex-row place-content-between">
                <img
                    src={profileImage}
                    alt="Profile pic"
                    className="h-20 w-20 rounded-lg object-cover shadow-lg"
                />
                <Cog6ToothIcon className="mt-1 h-4 w-4 cursor-pointer dark:text-white max-sm:hidden" />
            </div>
            <p className="pt-2 text-2xl">
                {user?.firstName} {user?.lastName}
            </p>

            <div className="flex flex-row pt-2">
                <BriefcaseIcon className="mt-1 h-4 w-4 dark:text-white max-sm:hidden" />
                <p className="pl-2 dark:text-gray-400">{user?.occupation}</p>
            </div>

            <div className="flex flex-row">
                <MapPinIcon className="mt-1 h-4 w-4 dark:text-white max-sm:hidden" />
                <p className="pl-2 dark:text-gray-400">{user?.country}</p>
            </div>

            <div className=" flex w-full flex-row place-content-between pt-8">
                <p className="dark:text-gray-400">Followers</p>
                <p className="dark:text-white">{user?.followers?.length}</p>
            </div>

            <div className=" flex w-full flex-row place-content-between">
                <p className="dark:text-gray-400">Followings</p>
                <p className="dark:text-white">{user?.followings?.length}</p>
            </div>
        </div>
    );
};

export default UserProfileCard;
