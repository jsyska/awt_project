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

const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const user = useSelector((state: AuthState) => state.user);
  const dispatch = useDispatch();

  return (
    <aside
      id="logo-sidebar"
      className={
        isMobile
          ? "fixed z-40 h-screen w-screen bg-slate-900 text-2xl transition-transform"
          : "sticky top-0 left-0 z-40 hidden h-screen w-fit -translate-x-full text-2xl transition-transform sm:block sm:translate-x-0"
      }
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-transparent">
        {!isMobile && (
          <Link to={"/"}>
            <div
              className="mb-7 flex items-center gap-2"
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="text-3xl">🚀</span>
              <span className="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white xl:inline">
                Netizen Space
              </span>
            </div>
          </Link>
        )}
        <ul className="space-y-2 border-b border-gray-200 pb-4 font-medium dark:border-gray-700">
          <li>
            <Link to={"/"}>
              <div
                onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
                className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HomeIcon className="h-7 w-7" />
                <span className={`ml-3 ${!isMobile && "hidden xl:inline"}`}>
                  Home
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to={`/${user?.username}`}>
              <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                <UserIcon className="h-7 w-7" />
                <span className={`ml-3 ${!isMobile && "hidden xl:inline"}`}>
                  Profile
                </span>
              </div>
            </Link>
          </li>
          <li>
            <a href="https://buy.stripe.com/test_bIY5n95LM7LF17W9AA">
              <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
                <StarIcon className="h-7 w-7" />
                <span className={`ml-3 ${!isMobile && "hidden xl:inline"}`}>
                  Upgrade to Pro
                </span>
              </div>
            </a>
          </li>
        </ul>
        <ul className="mt-4 w-fit space-y-2 font-medium">
          <li>
          <Link to={"/help"}>
            <div className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700">
              <QuestionMarkCircleIcon className="h-7 w-7" />
              <span className={`ml-3 ${!isMobile && "hidden xl:inline"}`}>
                Help
              </span>
            </div>
            </Link>
          </li>
          <li>
            <div
              className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => dispatch(setLogout())}
            >
              <ArrowLeftOnRectangleIcon className="h-7 w-7" />
              <span className={`ml-3 ${!isMobile && "hidden xl:inline"}`}>
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
