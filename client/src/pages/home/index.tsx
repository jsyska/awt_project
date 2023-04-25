import Navbar from "../../components/navbar";
import UserProfileCard from "../../components/userProfileCard";
import AddNewPost from "../../components/addNewPost";
import Posts from "../../components/posts";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-3">
            <Navbar />
            <div className="flex flex-col gap-8 p-4 md:flex-row md:gap-16">
                <div className=" order-1 h-2/3 w-full md:order-1 md:w-1/4">
                    <UserProfileCard />
                </div>

                <div className="order-3 flex w-full grow flex-col gap-3 md:order-2 md:w-1/3">
                    <AddNewPost />
                    <Posts />
                </div>

                <div className="order-2 w-1/4 md:order-3">reklamy</div>
            </div>
        </div>
    );
};

export default HomePage;
