import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../redux';
import {
    BriefcaseIcon,
    MapPinIcon,
    Cog6ToothIcon
} from "@heroicons/react/24/solid";

const UserProfileCard: React.FC = (): JSX.Element => {
    const user = useSelector((state: AuthState) => state.user);
    const dispatch = useDispatch();

    return (
        <div className=" flex p-5 w-3/5 overflow-auto">
            <div className="flex flex-col bg-slate-400 p-7 dark:bg-slate-800 sm:w-4/5 md:w-3/5 md:rounded-lg xl:w-2/5">

                <div className=' flex flex-row w-full place-content-between'>
                    <img
                        src={
                            user?.imagePath ||
                            "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png"
                        }
                        alt="Profile pic"
                        className="w-20 h-20 object-cover rounded-lg shadow-lg"
                    />
                    <Cog6ToothIcon className="h-4 w-4 mt-1 cursor-pointer dark:text-white max-sm:hidden" />

                </div>
                <p className="text-2xl pt-2">{user?.firstName} {user?.lastName}</p>

                <div className='flex flex-row pt-2'>
                    <BriefcaseIcon className="h-4 w-4 mt-1 dark:text-white max-sm:hidden" />
                    <p className='pl-2 dark:text-gray-400'>{user?.occupation}</p>
                </div>

                <div className='flex flex-row'>
                    <MapPinIcon className="h-4 w-4 mt-1 dark:text-white max-sm:hidden" />
                    <p className='pl-2 dark:text-gray-400'>{user?.country}</p>
                </div>

                <p className='pt-8 dark:text-gray-400'>Email address</p>
                <p className='dark:text-white'>{user?.email}</p>

                <div className=' pt-8 flex flex-row w-full place-content-between'>
                    <p className='dark:text-gray-400'>Followers</p>
                    <p className='dark:text-white'>{user?.followers.length}</p>
                </div>

                <div className=' flex flex-row w-full place-content-between'>
                    <p className='dark:text-gray-400'>Followings</p>
                    <p className='dark:text-white'>{user?.followings.length}</p>
                </div>

            </div>
        </div>
    )
}

export default UserProfileCard