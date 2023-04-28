import {
    HomeIcon,
    EnvelopeIcon,
    BellIcon,
    UserIcon,
    StarIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setLogout } from "../redux";

const Sidebar = () => {
    const user = useSelector((state: AuthState) => state.user);
    const dispatch = useDispatch();

    return (
        <aside
            id="logo-sidebar"
            className="sticky top-0 left-0 z-40 hidden h-screen w-fit -translate-x-full text-2xl transition-transform sm:block sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-transparent">
                <div className="mb-7 flex items-center gap-2">
                    <span className="text-3xl">🚀</span>
                    <span className="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white xl:inline">
                        Netizen Space
                    </span>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to={"/"}>
                            <div
                                onClick={() =>
                                    scrollTo({ top: 0, behavior: "smooth" })
                                }
                                className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <HomeIcon className="h-7 w-7" />
                                <span className="ml-3 hidden xl:inline">
                                    Home
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/chat"}>
                            <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <EnvelopeIcon className="h-7 w-7" />
                                <span className="ml-3 hidden xl:inline">
                                    Messages
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BellIcon className="h-7 w-7" />
                            <span className="ml-3 hidden xl:inline">
                                Notifications
                            </span>
                        </div>
                    </li>
                    <li>
                        <Link to={`/profile/${user?._id}`}>
                            <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <UserIcon className="h-7 w-7" />
                                <span className="ml-3 hidden xl:inline">
                                    Profile
                                </span>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <StarIcon className="h-7 w-7" />
                            <span className="ml-3 hidden xl:inline">
                                Upgrade to Pro
                            </span>
                        </div>
                    </li>
                </ul>
                <ul className="mt-4 w-fit space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
                    <li>
                        <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Cog6ToothIcon className="h-7 w-7" />
                            <span className="ml-3 hidden xl:inline">
                                Settings
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <QuestionMarkCircleIcon className="h-7 w-7" />
                            <span className="ml-3 hidden xl:inline">Help</span>
                        </div>
                    </li>
                    <li>
                        <div
                            className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => dispatch(setLogout())}
                        >
                            <ArrowLeftOnRectangleIcon className="h-7 w-7" />
                            <span className="ml-3 hidden xl:inline">
                                Sign Out
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
