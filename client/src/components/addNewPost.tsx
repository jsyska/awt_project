import { DocumentArrowUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, setPosts } from "../redux";
import {
    PhotoIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import useAutoResizeTextarea from "../hooks/UseAutoResizeTextarea";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import Spinner from "./loadingSpinner";
import _appsettings from "../../appsettings.json";

const AddNewPost: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [post, setPost] = useState<string>("");
    const { username } = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);
    const user = useSelector((state: AuthState) => state.user);
    const [showEmojis, setShowEmojis] = useState(false);
    const { textareaRef, resizeTextarea } = useAutoResizeTextarea();
    const [postUploading, setPostUploading] = useState(false);
    const serverUrl = _appsettings.CONFIG.ENVIRONMENT === "development" ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}` : "";

    const handlePost = async () => {
        setPostUploading(true);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`${serverUrl}/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts: posts }));
        setImage(null);
        setPost("");
        setIsImage(false);
        setPostUploading(false);
    };

    return (
        <>
            <div className="my-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-slate-800">
                <div className="rounded-t-lg bg-white px-4 py-2 dark:bg-slate-900">
                    <div className="flex flex-row">
                        <img
                            src={
                                user?.imagePath ||
                                "https://www.civictheatre.ie/wp-content/uploads/2016/05/blank-profile-picture-973460_960_720.png"
                            }
                            alt="Profile pic"
                            className="mr-2 h-10 w-10 rounded-full object-cover"
                        />
                        <textarea
                            ref={textareaRef}
                            onChange={(e) => {
                                setPost(e.target.value);
                                resizeTextarea();
                            }}
                            value={post}
                            id="postContent"
                            rows={1}
                            className="scrollbar-width-none hide-scrollbar  mr-8 block max-h-[400px] w-full resize-none overflow-auto rounded-lg bg-transparent p-2.5 text-xl text-gray-900 outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:focus:border-0 dark:focus:ring-0"
                            placeholder={`Hello ${user?.firstName}, whats poppin?`}
                        />
                    </div>
                    {isImage && (
                        <div className="flex flex-row items-center gap-2">
                            <Dropzone
                                accept={{
                                    "image/png": [".png"],
                                    "image/jpeg": [".jpeg", ".jpg"],
                                }}
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setImage(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        {...getRootProps()}
                                        className="m-6 flex  w-full cursor-pointer items-center justify-center rounded-md bg-gray-300 p-3 text-sm
                       text-slate-100 dark:bg-slate-800 dark:text-slate-500"
                                    >
                                        {!image && (
                                            <DocumentArrowUpIcon className="mr-2 h-5 w-5 " />
                                        )}
                                        <div className="relative">
                                            <p>
                                                {image && (
                                                    <TrashIcon
                                                        className="absolute right-0 m-3 ml-auto h-12 w-12 cursor-pointer rounded-full bg-slate-900 p-2 text-white hover:bg-blue-100 dark:hover:bg-gray-700"
                                                        onClick={(event) => {
                                                            setImage(null);
                                                            event.stopPropagation();
                                                        }}
                                                    />
                                                )}
                                                {image ? (
                                                    <img
                                                        className="mx-auto h-auto rounded-lg"
                                                        src={URL.createObjectURL(
                                                            image
                                                        )}
                                                        alt="image description"
                                                    />
                                                ) : (
                                                    "Click to upload or drag and drop"
                                                )}
                                            </p>
                                        </div>
                                        <input {...getInputProps()} />
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
                    <div className="flex space-x-1 pl-0 sm:pl-2">
                        <PhotoIcon
                            onClick={() => {
                                setIsImage(!isImage);
                                setImage(null);
                            }}
                            className="inline-flex w-12 cursor-pointer justify-center rounded-lg p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        />
                        <div className="relative">
                            <FaceSmileIcon
                                onClick={() => setShowEmojis(!showEmojis)}
                                className="inline-flex w-12 cursor-pointer justify-center rounded-lg p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            />
                            <div className="left- absolute">
                                {showEmojis && (
                                    <EmojiPicker
                                        emojiStyle={EmojiStyle.NATIVE}
                                        onEmojiClick={(emoji) => {
                                            setPost(post + emoji.emoji);
                                            setShowEmojis(false);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {!postUploading && (
                        <PaperAirplaneIcon
                            onClick={post ? handlePost : undefined}
                            className={`${
                                !post ? "hidden" : ""
                            } inline-flex w-12 cursor-pointer justify-center rounded-lg p-2 text-white hover:bg-gray-100 dark:hover:bg-gray-600`}
                        />
                    )}
                    {postUploading && <Spinner />}
                </div>
            </div>
        </>
    );
};

export default AddNewPost;
