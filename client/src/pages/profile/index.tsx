import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Posts from "../../components/posts";
import { useParams } from "react-router";
import UserProfileCard from "../../components/userProfileCard";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state: AuthState) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return null;

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <Navbar />
            <div className="flex flex-col gap-8 md:w-2/3 md:flex-row">
                <div className="h-fit md:sticky md:top-3 md:w-1/3">
                    <UserProfileCard user={user} />
                </div>
                <div className="md:w-2/3">
                    <Posts isProfile={true} userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
