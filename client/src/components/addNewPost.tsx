import { DocumentArrowUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setPosts } from '../redux';

const AddNewPost: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState<string>("");
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const user = useSelector((state: AuthState) => state.user);
  const [showEmojis, setShowEmojis] = useState(false);




  const handlePost = async () => {
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
    dispatch(setPosts(posts));
    setImage(null);
    setPost("");
  };

  useEffect(() => {
    console.log(post)
  }, [post])

  return (
    <>
      <div className="flex flex-col bg-slate-400 gap-4 rounded-lg p-7 dark:bg-gray-700 ">
        <label htmlFor="postContent" className="sr-only">Your message</label>
        <div className="flex items-center bg-gray-300 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <button onClick={() => setIsImage(!isImage)} type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" ></path></svg>
            <span className="sr-only">Upload image</span>
          </button>
          <button onClick={() => setShowEmojis(!showEmojis)} type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"></path></svg>
            <span className="sr-only">Add emoji</span>
          </button>
          <textarea onChange={(e) => setPost(e.target.value)} value={post} id="postContent" rows={1} className="block mx-4 p-2.5 w-full text-xl text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
          <button onClick={handlePost} disabled={!post} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
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
                  className="flex w-full cursor-pointer bg-gray-300 items-center justify-center rounded-md p-3 text-sm
                       text-slate-100 dark:bg-slate-900 dark:text-slate-500"
                >
                  <DocumentArrowUpIcon className="mr-2 h-5 w-5 " />
                  <p>
                    {image
                      ? image.name
                      : "add an image"}
                  </p>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            {image && <TrashIcon className='h-8 w-8 text-white' onClick={() => setImage(null)} />}
          </div>)}
        {image && <img className="h-auto mx-auto rounded-lg" src={URL.createObjectURL(image)} alt="image description" />}
      </div>
    </>
  )
}

export default AddNewPost