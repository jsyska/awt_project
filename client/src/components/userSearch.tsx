import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _appsettings from "../../appSettings.json";
import { AuthState, User } from '../redux';

const UserSearch = () => {

    const [users, setUsers] = React.useState<User[]>([]);
    const [search, setSearch] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state: any) => state.token);
    const currentUser = useSelector((state: AuthState) => state.user);
    const ref = useRef<HTMLDivElement>(null);

    const serverUrl =
        _appsettings.CONFIG.ENVIRONMENT === "development"
            ? `${_appsettings.CONFIG.SERVER_RELATIVE_URL}`
            : "";


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${serverUrl}/users/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();

        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsFocused(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filteredUsers = users.filter(user => (
        user.firstName?.toLowerCase().includes(search.toLowerCase())
        ||
        user.lastName?.toLowerCase().includes(search.toLowerCase()))
    );

    const validURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div ref={ref} className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
                type="search"
                id="search"
                className="block w-full p-4 pl-10 text-sm border focus:bg-slate-900 rounded-lg bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search all users"
                autoComplete='off'
                onChange={handleSearch}
                value={search}
                onFocus={() => setIsFocused(true)}
            />
            {isFocused && (
                <div className='relative'>
                    <div className="absolute z-40 w-full mt-2 rounded-lg h-fit max-h-96 overflow-y-auto bg-slate-900 shadow-md shadow-slate-500 border ">
                        {filteredUsers.length === 0 ? <p className="p-4 text-center">No users found</p> : null}
                        {search.length === 0 ? <p className="p-4 text-sm text-center">Type name or last name of the user</p> : null}
            
                        {(search.length > 0 && filteredUsers.length > 0  ) &&filteredUsers.map((user, index) => (
                            <div key={index} className=" w-full p-4 center  dark:border-gray-600 dark:text-white ">
                                <Link to={`/${user.username} `}>
                                    <div className="flex items-center w-full hover:underline hover:brightness-90 ">
                                        <img
                                            className="w-12 h-12 rounded-full object-cover"
                                            src={validURL(user.imagePath) ? user.imagePath : "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Astronaut-512.png"}
                                            alt="avatar"
                                        />
                                        <p className="ml-3 font-medium">{user.firstName} {user.lastName}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserSearch

