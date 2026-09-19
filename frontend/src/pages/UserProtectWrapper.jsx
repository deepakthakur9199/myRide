import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl } from '../config';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${getBaseUrl()}/users/profile`, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data);
                setIsLoading(false);
            }
        }).catch(err => {
            console.error('User profile auth error:', err);
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [token, navigate, setUser]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center font-bold text-gray-600 bg-gray-50">
                Loading profile...
            </div>
        );
    }

    return <>{children}</>;
};

export default UserProtectWrapper;