import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import { useSelector } from "react-redux";
import { AuthState } from "./redux";
import PostPage from "./pages/post";

function App() {
    // if (
    //     localStorage.theme === "dark" ||
    //     (!("theme" in localStorage) &&
    //         window.matchMedia("(prefers-color-scheme: dark)").matches)
    // ) {
    //     document.documentElement.classList.add("dark");
    // } else {
    //     document.documentElement.classList.remove("dark");
    // }
    document.documentElement.classList.add("dark");

    const isAuth = Boolean(useSelector((state: AuthState) => state.token));

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isAuth ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/chat"
                    element={isAuth ? <ChatPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/status/:postId"
                    element={isAuth ? <PostPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/:username"
                    element={
                        isAuth ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
