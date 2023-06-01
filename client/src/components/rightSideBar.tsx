import React from 'react'
import FollowersList from './followersList'
import UserSearch from './userSearch'

interface IRightSideBarProps {
    isMobile?: boolean;
}

const RightSideBar = (props: IRightSideBarProps) => {
    return (
        <div className={`${props.isMobile ? "p-5 fixed z-40 h-screen w-screen bg-slate-900" : "w-80 m-3 sticky top-4"} flex flex-col gap-6`}>
            <UserSearch />
            <FollowersList isMobile={props.isMobile}/>
        </div>

    )
}

export default RightSideBar