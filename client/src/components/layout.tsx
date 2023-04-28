import React from "react";
import TempComponent from "./tempComponent";
import Sidebar from "./sidebar";

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex justify-center lg:gap-3">
            <div className="w-fit">
                <Sidebar />
            </div>
            <div className="mt-5 flex w-full flex-col items-center gap-3 md:w-3/4 lg:w-1/2 xl:w-1/3">
                {children}
            </div>
            <div className="hidden w-fit lg:inline ">
                <TempComponent />
            </div>
        </div>
    );
};

export default MainLayout;
