import React, { useState } from 'react';
import { MapPin, Navigation, Wallet, User, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl, extractErrorMessage } from '../config';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user = ride?.user || {};
    const userName = user?.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}` : 'Rider';

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError('Please enter valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${getBaseUrl()}/rides/start-ride`, {
                params: {
                    rideId: ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setConfirmRidePopupPanel(false);
                navigate('/captain-riding', { state: { ride: response.data } });
            }
        } catch (err) {
            setError(extractErrorMessage(err, 'Invalid OTP code. Please try again.'));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white p-5 rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-xl font-bold text-gray-900">Confirm OTP to Start Ride</h3>
                <button
                    onClick={() => setConfirmRidePopupPanel(false)}
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
                        <p className="text-xs text-gray-500">Picked up &bull; Ready to start</p>
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
            </div>

            <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-1">
                {error && (
                    <div className="p-2.5 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-center border border-red-200">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center">
                        Enter 6-Digit User OTP
                    </label>
                    <input
                        type="text"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="1 2 3 4 5 6"
                        className="w-full bg-gray-100 text-center font-mono font-bold text-2xl tracking-[0.5em] py-3.5 rounded-2xl border-2 border-gray-200 focus:border-black focus:outline-none transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => setConfirmRidePopupPanel(false)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 rounded-2xl transition-all text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all text-sm shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Starting...' : 'Verify OTP & Start'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmRidePopUp;
