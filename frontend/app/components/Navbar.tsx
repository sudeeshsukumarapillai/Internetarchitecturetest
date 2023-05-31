'use client'

import Link from "next/link";
import {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import {useNextKeycloakAuth} from "@krashnakant/next-keycloak";
import {KeycloakLoginOptions} from "keycloak-js";

export type MyNote = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
};

const Navbar = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {
        authenticated,
        login,
        register,
        userInfo,
        loading,
        token,
        logout,
        hasRealmRole,
    } = useNextKeycloakAuth();

    const userProfileUrl = () => {
        const baseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
        const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
        return `${baseUrl}/realms/${realm}/account/`;
    };


    const handleLogin = () => {
        // console.log(`NEXT_PUBLIC_KEYCLOAK_REALM=${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`);
        // console.log(`NEXT_PUBLIC_KEYCLOAK_URL=${process.env.NEXT_PUBLIC_KEYCLOAK_URL}`);
        // console.log(`NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`);
        // console.log(`NEXT_PUBLIC_BACKEND_URL=${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        // alert(`Click OK to login.`);
        const option: KeycloakLoginOptions = {
            redirectUri: window.location.origin,
        };
        login(option);
    };


    return (
        <header className="flex flex-row justify-between py-4">
            <div className="px-4">
                <Link href={"/"} className="font-bold text-lg">
                    Nirvana notes
                </Link>
            </div>
            <div>
                <ul className="flex flex-row">
                    <li className="mx-2">
                        <Link href={"/notes"}>Notes</Link>
                    </li>
                    {authenticated ? (
                        <>
                            <li className="mx-2">
                                <a href={userProfileUrl()} target="_blank" rel="noopener noreferrer">User Profile</a>
                            </li>
                            <li className="mx-2">
                                <button
                                    onClick={() => logout({redirectUri: window.location.origin})}
                                >
                                    Logout
                                </button>
                            </li>
                            <li className="mx-2 user-label">
                                <p>Welcome {userInfo.name}</p>
                                {/* <p>Welcome {userInfo.name} ({userInfo.email})</p> */}
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="mx-2">
                                <button onClick={handleLogin}>Login</button>
                            </li>
                            <li className="mx-2">
                                <button onClick={() => register()}>Register</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="px-3">
                <Link
                    href={"/new"}
                    className="flex cursor-pointer bg-green-600 py-2 px-2 rounded-md text-white"
                    onClick={() => console.log("clicked")}
                >
                    <span>Add note</span> <FaPlus className="mt-1 ml-2"/>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
