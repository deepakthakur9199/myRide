import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import FinishRide from '../components/FinishRide';
import { MapPin, Navigation, Wallet, User, CheckCircle, Home } from 'lucide-react';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const location = useLocation();
    const rideData = location.state?.ride;

    const user = rideData?.user || {};
    const userName = user?.fullname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}` : 'Rider';

    return (
        <div className="h-screen w-screen relative flex flex-col justify-between bg-gray-100 overflow-hidden">
            {/* Top Bar */}
            <div className="fixed top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-black text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg pointer-events-auto">
                    Trip in Progress 🚗
                </div>

                <Link
                    to="/captain-home"
                    className="p-3 bg-white/90 backdrop-blur-md hover:bg-gray-100 rounded-full shadow-lg border border-gray-100 text-gray-800 pointer-events-auto"
                >
                    <Home className="w-5 h-5" />
                </Link>
            </div>

            {/* Live Map */}
            <div className="w-full h-full absolute inset-0 z-0">
                <LiveTracking />
            </div>

            {/* Bottom Sheet */}
            <div className="relative z-10 p-5 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col gap-4 max-w-md w-full mx-auto mt-auto">
                <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-base">{userName}</h4>
                            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> OTP Verified
                            </p>
                        </div>
                    </div>
                    <h2 className="text-xl font-extrabold text-gray-900">₹{rideData?.fare || 150}</h2>
                </div>

                <div className="w-full flex flex-col gap-2 text-sm">
                    <div className="flex items-start gap-3">
                        <Navigation className="w-4 h-4 text-black mt-1 shrink-0" />
                        <div>
                            <h5 className="font-bold text-gray-800 text-xs">Destination</h5>
                            <p className="text-xs text-gray-500 leading-snug">{rideData?.destination}</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setFinishRidePanel(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg text-base mt-1"
                >
                    Complete Ride & Collect Payment
                </button>
            </div>

            {/* Finish Ride Modal */}
            {finishRidePanel && (
                <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-end">
                    <div className="w-full max-w-md mx-auto">
                        <FinishRide
                            ride={rideData}
                            setFinishRidePanel={setFinishRidePanel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaptainRiding;
