import { DocumentArrowUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setPosts } from '../redux';
import { PhotoIcon, FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import useAutoResizeTextarea from '../hooks/UseAutoResizeTextarea';
import EmojiPicker, {
  EmojiStyle
} from "emoji-picker-react";
import Spinner from "./loadingSpinner";


const AddNewPost: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState<string>("");
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: AuthState) => state.user);
  const [showEmojis, setShowEmojis] = useState(false);
  const { textareaRef, resizeTextarea } = useAutoResizeTextarea();
  const [postUploading, setPostUploading] = useState(false);

  const handlePost = async () => {
    setPostUploading(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch("http://localhost:3001/posts", {
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
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-800 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-slate-900">
          <textarea
            ref={textareaRef}
            onChange={(e) => {
              setPost(e.target.value);
              resizeTextarea();
            }}
            value={post}
            id="postContent"
            rows={1}
            className="block mx-4 p-2.5 w-full text-xl text-gray-900 bg-transparent rounded-lg border-0 focus:border-0 focus:ring-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-0 resize-none overflow-auto max-h-[600px] scrollbar-width-none hide-scrollbar"
            placeholder={`Hello ${user?.firstName}, whats happening?`}
          />
          {isImage && (
            <div className='flex flex-row gap-2 items-center'>
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
                    className="flex w-full  m-6 cursor-pointer bg-gray-300 items-center justify-center rounded-md p-3 text-sm
                       text-slate-100 dark:bg-slate-800 dark:text-slate-500"
                  >
                    {!image && <DocumentArrowUpIcon className="mr-2 h-5 w-5 " />}
                    <div className='relative'>

                      <p>
                        {image &&
                          <TrashIcon
                            className='absolute right-0 m-3 p-2 h-12 w-12 text-white ml-auto rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 bg-slate-900'
                            onClick={(event) => {
                              setImage(null)
                              event.stopPropagation()
                            }} />
                        }
                        {image
                          ? <img className="h-auto mx-auto rounded-lg" src={URL.createObjectURL(image)} alt="image description" />
                          : "Click to upload or drag and drop"}
                      </p>
                    </div>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
            </div>)}
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <PhotoIcon
              onClick={() => {
                setIsImage(!isImage)
                setImage(null)
              }}
              className="inline-flex justify-center w-12 p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-white dark:hover:bg-gray-600" />
            <div className='relative'>
              <FaceSmileIcon onClick={() => setShowEmojis(!showEmojis)} className="inline-flex justify-center w-12 p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-white dark:hover:bg-gray-600" />
              <div className='absolute left-'>
                {showEmojis && (
                  <EmojiPicker 
                  emojiStyle={EmojiStyle.NATIVE}
                  onEmojiClick={(emoji) => {
                    setPost(post + emoji.emoji)
                    setShowEmojis(false);
                  }}/>
                )}
              </div>
            </div>
          </div>
          {!postUploading && <PaperAirplaneIcon onClick={post ? handlePost : undefined} className={`${!post ? 'hidden' : ''} inline-flex justify-center w-12 p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-white dark:hover:bg-gray-600`} />}
          {postUploading && <Spinner/>}
        </div>
      </div>
    </>
  )
}

export default AddNewPost