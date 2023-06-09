import { useEffect, useState } from "react";
import Posts from "../../components/posts";
import { useLocation, useParams } from "react-router";
import UserProfileCard from "../../components/userProfileCard";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import MainLayout from "../../components/layout";
import { AwaitProps } from "react-router";
import _appsettings from "../../../appSettings.json";

const ProfilePage = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const token = useSelector((state: AuthState) => state.token);
    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";

    const getUser = async () => {
        const response = await fetch(`${serverUrl}/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [location.pathname]);

    return (
        <MainLayout>
            {user ? (
                <>
                    <UserProfileCard user={user} />
                    <Posts isProfile={true} username={username} user={user} />
                </>
            ) : (
    <Spinner />
)}
        </MainLayout>
    );
};

export default ProfilePage;
