import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    imagePath: string;
    followers: string[];
    followings: string[];
    country?: string;
    occupation?: string;
    createdAt?: Number;
    updatedAt?: Number;
}

interface Comment {
    username: string;
    comment: string;
}

export interface Post {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    description: string;
    userImagePath: string;
    imagePath: string;
    likes: Map<string, boolean>;
    comments: Array<Comment>;
    createdAt?: Number;
    updatedAt?: Number;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    posts: Post[];
}

const initialState: AuthState = {
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFollowers: (
            state,
            action: PayloadAction<{ followers: string[] }>
        ) => {
            if (state.user) {
                state.user.followers = action.payload.followers;
            } else {
                console.log("Followers do not exist");
            }
        },
        setFollowings: (
            state,
            action: PayloadAction<{ followings: string[] }>
        ) => {
            if (state.user) {
                state.user.followings = action.payload.followings;
            } else {
                console.log("Followings do not exist");
            }
        },
        setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action: PayloadAction<{ post: Post }>) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const {
    setLogin,
    setLogout,
    setFollowers,
    setFollowings,
    setPosts,
    setPost,
} = authSlice.actions;

export default authSlice.reducer;
