import AddNewPost from "../../components/addNewPost";
import Posts from "../../components/posts";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux";
import Spinner from "../../components/loadingSpinner";
import Sidebar from "../../components/sidebar";

const HomePage = () => {
    const user = useSelector((state: AuthState) => state.user);

    return user ? (
        <div className="flex gap-3 px-52">
            <div className="w-1/5">
                <Sidebar />
            </div>
            <div className="flex w-2/4 flex-col gap-3">
                <AddNewPost />
                <Posts />
            </div>
            <div className="w-1/5">reklamy</div>
        </div>
    ) : (
        <Spinner />
    );
};

export default HomePage;
