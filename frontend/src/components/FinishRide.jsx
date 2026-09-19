import React, { useState } from 'react';
import { MapPin, Navigation, Wallet, User, CheckCircle2, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinishRide = ({ ride, setFinishRidePanel }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user = ride?.user || {};
    const userName = user?.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}` : 'Rider';

    const endRideHandler = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setFinishRidePanel(false);
                navigate('/captain-home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to complete ride');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-xl font-bold text-gray-900">Finish this Ride</h3>
                <button
                    onClick={() => setFinishRidePanel(false)}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-base">{userName}</h4>
                        <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Arrived at Destination
                        </p>
                    </div>
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">₹{ride?.fare || 150}</h2>
            </div>

            <div className="w-full flex flex-col gap-3 divide-y divide-gray-100 text-sm">
                <div className="flex items-start gap-4 pt-1">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">Pickup</h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ride?.pickup}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <Navigation className="w-4 h-4 text-black" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">Destination</h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{ride?.destination}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 pt-2">
                    <div className="p-2 bg-gray-100 rounded-full text-gray-700 mt-1">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-xs">Payment Collectable</h4>
                        <p className="text-xs text-emerald-600 font-bold mt-0.5">₹{ride?.fare || 150} Cash</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-2.5 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center border border-red-200">
                    {error}
                </div>
            )}

            <button
                onClick={endRideHandler}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg text-base mt-2 disabled:opacity-50"
            >
                {loading ? 'Completing...' : 'Collect Payment & Finish Trip'}
            </button>
        </div>
    );
};

export default FinishRide;
