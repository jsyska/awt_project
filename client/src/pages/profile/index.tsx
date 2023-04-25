import React from "react";
import Navbar from "../../components/navbar";
import Posts from "../../components/posts";
import { useParams } from "react-router";

const ProfilePage = () => {
    const { userId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <Navbar />
            <div className="md:w-1/3">
                <Posts isProfile={true} />
            </div>
        </div>
    );
};

export default ProfilePage;
