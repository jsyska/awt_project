import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Posts from "../../components/posts";
import { useParams } from "react-router";
import UserProfileCard from "../../components/userProfileCard";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import Sidebar from "../../components/sidebar";
import TempComponent from "../../components/tempComponent";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state: AuthState) => state.token);
    console.log(user);

    const getUser = async () => {
        const response = await fetch(`/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="flex gap-3 px-52">
            <div className="w-1/5">
                <Sidebar />
            </div>
                {user ? (
                    <div className="flex w-2/4 flex-col gap-3 mt-5">
                        <UserProfileCard user={user} />
                        <Posts isProfile={true} userId={userId} />
                    </div>
                ) : (
                    <Spinner />
                )}
            <div className="w-1/5">
                <TempComponent />
            </div>
        </div>
    );
};

export default ProfilePage;
