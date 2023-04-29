import { useEffect, useState } from "react";
import Posts from "../../components/posts";
import { useParams } from "react-router";
import UserProfileCard from "../../components/userProfileCard";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import MainLayout from "../../components/layout";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const token = useSelector((state: AuthState) => state.token);
    console.log(user);

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${username}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <MainLayout>
            {user ? (
                <>
                    <UserProfileCard user={user} />
                    <Posts isProfile={true} username={username} />
                </>
            ) : (
                <Spinner />
            )}
        </MainLayout>
    );
};

export default ProfilePage;
