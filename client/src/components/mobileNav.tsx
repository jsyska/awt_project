import { Bars3Icon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import FollowersList from "./followersList";

const MobileNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    return (
        <>
            <div className="sticky top-0 left-0 flex w-screen items-center justify-between px-2 py-4 dark:bg-slate-900 sm:hidden">
                <Bars3Icon
                    className="h-7 w-7"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <Link to={"/"}>
                    <span
                        className="text-2xl"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        🚀
                    </span>
                </Link>
                <div className="w-7"><UserGroupIcon onClick={() => {setShowFollowers(!showFollowers)}}/></div>
            </div>
            {isSidebarOpen && <Sidebar isMobile={true} />}
            {showFollowers && <FollowersList isMobile={true}/>}
        </>
    );
};

export default MobileNav;
