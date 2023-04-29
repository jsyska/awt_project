import AddNewPost from "../../components/addNewPost";
import Posts from "../../components/posts";
import MainLayout from "../../components/layout";

const HomePage = () => {
    return (
        <MainLayout>
            <AddNewPost />
            <Posts />
        </MainLayout>
    );
};

export default HomePage;
