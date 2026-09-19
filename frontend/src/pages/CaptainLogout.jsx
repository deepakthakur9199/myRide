import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        }).catch(() => {
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }, [token, navigate]);

    return (
        <div className="h-screen flex items-center justify-center font-bold text-gray-500">
            Logging out captain...
        </div>
    );
};

export default CaptainLogout;
