import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setFollowers, setFollowings } from '../redux';
import _appsettings from "../../appSettings.json";
import { Link } from 'react-router-dom';


export enum UserType {
    FOLLOWER,
    FOLLOWING
}

interface IFollowerListProps {
    isMobile?: boolean;
}

const FollowersList = (props: IFollowerListProps) => {
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.token);
    const currentUser = useSelector((state: AuthState) => state.user);
    const followings = useSelector((state: AuthState) => state.user?.followings);
    const followers = useSelector((state: AuthState) => state.user?.followers);
    const [type, setType] = React.useState(UserType.FOLLOWING);

    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

    const unfollowUser = async (user: any) => {
        const response = await fetch(`${serverUrl}/users/${currentUser?._id}/${user?._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            if (type === UserType.FOLLOWING) {
                dispatch(setFollowings({ followings: data }));
            } else if (type === UserType.FOLLOWER) {
                dispatch(setFollowings({ followings: data }));
            }
        }
    };

    const followButton = (user: any) => {
        const isFollowing = followings?.some((following: any) => following._id === user?._id);
        if (!isFollowing) {
            return <UserPlusIcon className="h-8 w-8" />
        } else {
            return <UserMinusIcon className="h-8 w-8" />
        }
    }

    const fetchFollowings = async () => {
        const response = await fetch(`${serverUrl}/users/${currentUser?._id}/followings`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch(setFollowings({ followings: data }))
        }
    }

    const fetchFollowers = async () => {
        const response = await fetch(`${serverUrl}/users/${currentUser?._id}/followers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            dispatch(setFollowers({ followers: data }))
        }
    }

    useEffect(() => {
        fetchFollowings();
        fetchFollowers();
    }, [])


    return (
        <>
            <div className={`${props.isMobile ? "p-5 fixed z-40 h-screen w-screen bg-slate-900 text-2xl transition-transform" : "m-3"}`}>
                <div className={`${props.isMobile ? "" : "w-80"} flex flex-row justify-center gap-3`}>
                    <span onClick={() => { setType(UserType.FOLLOWING) }} className={`${type === UserType.FOLLOWING ? "border-b-2 border-white rounded-t-lg text-2xl dark:text-white " : "rounded-full text-sm dark:text-gray-400"} self-center whitespace-nowrap font-semibold p-2 xl:inline hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer`}>
                        You follow
                    </span>
                    <span onClick={() => { setType(UserType.FOLLOWER) }} className={`${type === UserType.FOLLOWER ? "border-b-2 border-white rounded-t-lg text-2xl dark:text-white " : "rounded-full text-sm dark:text-gray-400"} self-center whitespace-nowrap font-semibold p-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer`}>
                        Your followers
                    </span>
                </div>
                {type === UserType.FOLLOWING && followings?.map((follower: any, index: any) => (
                    <div key={`${index}-${follower._id}`} className="flex items-center justify-between mt-3">
                        <Link to={`/${follower.username} `}>
                            <div className="flex items-center hover:underline hover:brightness-90">
                                <img
                                    className="w-14 h-14 rounded-full object-cover"
                                    src={follower.imagePath}
                                    alt="avatar"
                                />

                                <p className="ml-3 text-lg font-medium">{follower.firstName} {follower.lastName}</p>
                            </div>
                        </Link>
                        <div onClick={() => unfollowUser(follower)} className="flex w-fit items-center rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            {followButton(follower)}
                        </div>
                    </div>
                ))}
                {type === UserType.FOLLOWER && followers?.map((follower: any, index: any) => (
                    <div key={`${index}-${follower._id}`} className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                            <img
                                className="w-14 h-14 rounded-full object-cover"
                                src={follower.imagePath}
                                alt="avatar"
                            />
                            <p className="ml-3 text-lg font-medium">{follower.firstName} {follower.lastName}</p>
                        </div>
                        <div onClick={() => unfollowUser(follower)} className="flex w-fit items-center rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer">
                            {followButton(follower)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FollowersList