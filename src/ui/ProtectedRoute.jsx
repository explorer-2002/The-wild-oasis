import styled from "styled-components";
// import { useUser } from "../features/authentication/useUser";
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FullPage = styled.div`
    height:100vh;
    background-color: var(--color-grey-50);
    display:flex;
    align-items: center;
    justify-content: center;
`

async function checkAuth() {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/status`, {
            credentials: 'include'
        });

        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        return false;
    }
}

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // const { isLoading, isAuthenticated} = useUser();

    // useEffect(() => {
    //     if(!isAuthenticated && !isLoading)
    //         navigate("/login")
    // },[isLoading, isAuthenticated, navigate])

    // if(isLoading)
    //     return <FullPage><Spinner /></FullPage>

    // if(isAuthenticated)
    // return children;

    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = determined
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkAuthStatus() {
            const result = await checkAuth();
            console.log('Auth result:', result);

            if (result.authenticated) {
                setIsAuthenticated(true);
                dispatch(setUser({
                    id: result?.user?.id,
                    email: result?.user?.email,
                    userName: result?.user?.displayName,
                    phone: result?.user?.phone,
                    role: result?.user?.role,
                    avatar: result?.user?.avatar
                }));
            } else {
                setIsAuthenticated(false);
                navigate('/login');
            }
        }

        checkAuthStatus();
    }, [navigate]);

    // Show loading spinner while checking auth
    if (isAuthenticated === null) {
        return <FullPage><Spinner /></FullPage>
    }

    // If authenticated, render children
    return children;
}


