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
import { Link } from "react-router-dom";

const HelpPage = () => {

    return (
        <div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature?  Let us know.</p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@netizen.space" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className="flex flex-row w-full place-content-between">
                        <div
                            onClick={() =>
                                scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <span
                                className={`ml-3 ${"inline"
                                    }`}
                            >
                                Send message
                            </span>
                        </div>
                        <Link to={"/"}>
                            <div
                                onClick={() =>
                                    scrollTo({ top: 0, behavior: "smooth" })
                                }
                                className="flex w-fit items-center rounded-full p-3 pr-5 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <span
                                    className={`ml-3 ${"inline"
                                        }`}
                                >
                                    Go Back
                                </span>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>);
};

export default HelpPage;
