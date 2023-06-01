import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers, setFollowings, User } from "../redux";
import { AuthState } from "../redux";
import {
    BriefcaseIcon,
    MapPinIcon,
    UserPlusIcon,
    CalendarIcon,
    UserMinusIcon,
} from "@heroicons/react/24/solid";
import _appsettings from "../../appSettings.json";
import moment from "moment";



const UserProfileCard = ({ user }: { user: User }) => {

    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.token);
    const currentUser = useSelector((state: AuthState) => state.user);
    const followings = useSelector((state: AuthState) => state.user?.followings);
    const isFollowing = followings?.some((following: any) => following._id === user?._id);
    const isCurrentUser = currentUser?._id === user?._id;

    const defaultImage =
        "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Astronaut-512.png";

    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

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

    const followUser = async () => {
        const response = await fetch(`${serverUrl}/users/${currentUser?._id}/${user?._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch(setFollowings({ followings: data }));
        }
    };


    return (
        <div className=" shadow-xl pb-8 mt-4 flex w-full flex-col rounded-lg bg-slate-400 dark:bg-slate-800">
            <div className="w-full h-[200px]">
                <img src="https://images.template.net/96814/space-star-background-vg59s.png" className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover" />
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col pl-10 -mt-20">
                    <img src={profileImage} className="w-40 h-40 border-4 border-slate-800 rounded-full object-cover" />
                    <div className="flex flex-col mt-2 mb-3">
                        <p className="text-2xl">{user?.firstName} {user?.lastName}</p>
                        <p className="text-gray-400">@{user?.username}</p>
                    </div>

                    <div className="flex flex-row pt-2">
                        <CalendarIcon className="mt-1 h-5 w-5 dark:text-gray-400" />
                        <p className="pl-2 text-gray-400 text-lg">Joined {moment(user?.createdAt?.toString()).format("LL")}</p>
                    </div>

                    <div className="flex flex-row">
                        <BriefcaseIcon className="mt-1 h-5 w-5 dark:text-gray-400" />
                        <p className="pl-2 dark:text-gray-400 text-lg">{user?.occupation ? user?.occupation : "No occupation"}</p>
                    </div>

                    <div className="flex flex-row">
                        <MapPinIcon className="mt-1 h-5 w-5 dark:text-gray-400" />
                        <p className="pl-2 dark:text-gray-400 text-lg">{user?.country}</p>
                    </div>

                    <div className="flex flex-row gap-3 mt-3 ">
                        <div className=" flex w-full flex-row gap-1 ">
                            <p className="dark:text-white text-lg font-semibold">{user?.followers?.length}</p>
                            <p className="dark:text-gray-400 text-lg">Followers</p>
                        </div>

                        <div className=" flex w-full gap-1 flex-row ">
                            <p className="dark:text-white text-lg font-semibold">{user?.followings?.length}</p>
                            <p className="dark:text-gray-400 text-lg">Followings</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">
                        {!isCurrentUser &&
                            <div onClick={followUser} className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                                {!isFollowing && <UserPlusIcon className="h-7 w-7" />}
                                {isFollowing && <UserMinusIcon className="h-7 w-7" />}
                                <p className={`ml-2 text-lg`}>Follow</p>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div >
    );
};

export default UserProfileCard;
