import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import LiveTracking from '../components/LiveTracking';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketDataContext } from '../context/SocketContext';
import axios from 'axios';
import { Car, LogOut, Power } from 'lucide-react';
import { getBaseUrl } from '../config';


const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const [ride, setRide] = useState(null);
    const [isOnline, setIsOnline] = useState(true);

    const { captain } = useContext(CaptainDataContext);
    const { socket, sendMessage, receiveMessage } = useContext(SocketDataContext);
    const navigate = useNavigate();

    // Join socket room
    useEffect(() => {
        if (captain && captain._id) {
            sendMessage('join', {
                userType: 'captain',
                userId: captain._id
            });
        }
    }, [captain, sendMessage]);

    // Stream live location periodically
    useEffect(() => {
        if (!captain || !isOnline) return;

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    sendMessage('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };

        updateLocation();
        const locationInterval = setInterval(updateLocation, 10000);

        return () => clearInterval(locationInterval);
    }, [captain, isOnline, sendMessage]);

    // Listen for new ride requests
    useEffect(() => {
        receiveMessage('new-ride', (data) => {
            setRide(data);
            setRidePopupPanel(true);
        });
    }, [receiveMessage]);

    const confirmRide = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${getBaseUrl()}/rides/confirm`, {
                rideId: ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (response.status === 200) {
                setRidePopupPanel(false);
                setConfirmRidePopupPanel(true);
            }
        } catch (err) {
            console.error('Error confirming ride:', err);
        }
    };

    return (
        <div className="h-screen w-screen relative overflow-hidden flex flex-col justify-between bg-gray-100">
            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg pointer-events-auto border border-gray-100">
                    <Car className="w-5 h-5 text-emerald-600" />
                    <span className="font-extrabold text-lg tracking-tight text-gray-900">myRide Captain</span>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-xs shadow-lg backdrop-blur-md transition-all border ${
                            isOnline
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-gray-800 text-gray-300 border-gray-700'
                        }`}
                    >
                        <Power className="w-3.5 h-3.5" />
                        <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                    </button>

                    <button
                        onClick={() => navigate('/captain/logout')}
                        className="p-2.5 bg-white/90 backdrop-blur-md hover:bg-gray-100 rounded-full shadow-lg text-gray-700 transition-all border border-gray-100"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Map background */}
            <div className="w-full h-full absolute inset-0 z-0">
                <LiveTracking />
            </div>

            {/* Bottom Dashboard details */}
            <div className="relative z-10 p-4 max-w-md w-full mx-auto mt-auto">
                <CaptainDetails />
            </div>

            {/* New Ride Request Notification PopUp */}
            {ridePopupPanel && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <RidePopUp
                            ride={ride}
                            confirmRide={confirmRide}
                            setRidePopupPanel={setRidePopupPanel}
                        />
                    </div>
                </div>
            )}

            {/* Confirm Ride & OTP Modal */}
            {confirmRidePopupPanel && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <ConfirmRidePopUp
                            ride={ride}
                            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaptainHome;
